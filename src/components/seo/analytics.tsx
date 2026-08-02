import Script from "next/script";

/**
 * Measurement.
 *
 * Every provider is driven by an environment variable. With none set,
 * nothing is injected — no empty script tags, no console noise, no
 * performance cost. Adding a provider later is configuration only:
 * set the variable in Vercel and redeploy.
 *
 *   NEXT_PUBLIC_GA4_ID        e.g. G-XXXXXXXXXX
 *   NEXT_PUBLIC_CLARITY_ID    e.g. abcdefghij
 *   NEXT_PUBLIC_GTM_ID        e.g. GTM-XXXXXXX
 *
 * Search Console and Bing verify by DNS or by the meta tags below.
 */

const GA4 = process.env.NEXT_PUBLIC_GA4_ID;
const CLARITY = process.env.NEXT_PUBLIC_CLARITY_ID;
const GTM = process.env.NEXT_PUBLIC_GTM_ID;

export function Analytics() {
  return (
    <>
      {GTM && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM}');`}
        </Script>
      )}

      {GA4 && !GTM && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${GA4}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {CLARITY && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","${CLARITY}");`}
        </Script>
      )}
    </>
  );
}

/**
 * Conversion events.
 *
 * Traffic without enquiries has no value, so the events that matter are
 * the ones tied to a real submission — not page views. Safe to call
 * whether or not any provider is configured.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  };
  try {
    if (w.gtag) w.gtag("event", name, params);
    else if (w.dataLayer) w.dataLayer.push({ event: name, ...params });
    if (w.clarity) w.clarity("event", name);
  } catch {
    /* measurement must never break the page */
  }
}
