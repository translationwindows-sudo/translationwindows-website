"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PayPal checkout.
 *
 * The SDK renders its own button and handles the payment window. When the
 * customer completes it we send only the order id to our server, which
 * verifies it directly with PayPal before crediting anything — the browser
 * is never trusted to say a payment succeeded.
 */
export function PayPalButton({
  clientId, amount, currency, token, invoiceNumber, onPaid,
}: {
  clientId: string;
  amount: number;
  currency: string;
  token: string;
  invoiceNumber: string;
  onPaid: (message: string) => void;
}) {
  const holder = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "working" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    const render = () => {
      const paypal = (window as unknown as { paypal?: Record<string, unknown> }).paypal;
      if (!paypal || !holder.current || cancelled) return;

      holder.current.innerHTML = "";
      setState("ready");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (paypal as any).Buttons({
        style: { layout: "vertical", color: "black", shape: "pill", label: "pay", height: 44 },

        createOrder: (_d: unknown, actions: {
          order: { create: (o: unknown) => Promise<string> };
        }) =>
          actions.order.create({
            intent: "CAPTURE",
            purchase_units: [{
              amount: { value: amount.toFixed(2), currency_code: currency || "USD" },
              description: `Translation Windows — invoice ${invoiceNumber}`,
              custom_id: token,
            }],
          }),

        onApprove: async (_d: unknown, actions: { order: { capture: () => Promise<{ id: string }> } }) => {
          setState("working");
          try {
            const captured = await actions.order.capture();
            const form = new FormData();
            form.append("token", token);
            form.append("action", "confirm_paypal");
            form.append("order_id", captured.id);

            const res = await fetch("/api/portal", { method: "POST", body: form });
            const data = await res.json().catch(() => null);

            if (res.ok && data?.ok) {
              onPaid(typeof data.message === "string" ? data.message : "Payment received. Thank you.");
            } else {
              setState("error");
              setMessage(
                typeof data?.error === "string"
                  ? data.error
                  : "Your payment went through, but we could not record it automatically. Please contact us with your PayPal receipt and we will sort it immediately.",
              );
            }
          } catch {
            setState("error");
            setMessage(
              "Your payment may have completed. Please do not pay again — contact us and we will check before anything else.",
            );
          }
        },

        onError: () => {
          setState("error");
          setMessage("PayPal could not complete that. No payment has been taken. Please try again, or contact us.");
        },
      }).render(holder.current);
    };

    const existing = document.getElementById("paypal-sdk");
    if (existing) { render(); return () => { cancelled = true; }; }

    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src =
      `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}` +
      `&currency=${encodeURIComponent(currency || "USD")}&intent=capture&components=buttons`;
    script.async = true;
    script.onload = render;
    script.onerror = () => {
      if (!cancelled) {
        setState("error");
        setMessage("The payment provider could not be reached. Please try again shortly, or contact us to pay another way.");
      }
    };
    document.body.appendChild(script);

    return () => { cancelled = true; };
  }, [clientId, amount, currency, token, invoiceNumber, onPaid]);

  return (
    <div className="tv-paypal">
      {state === "loading" && <p className="tv-muted tv-sm">Loading secure payment…</p>}
      {state === "working" && <p className="tv-muted tv-sm">Confirming your payment — please do not close this page.</p>}
      {state === "error" && <p className="tv-payerr">{message}</p>}
      <div ref={holder} />
    </div>
  );
}
