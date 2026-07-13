import type { QuoteRequest, QuoteResult } from "@/types";
import type { QuoteService } from "./quote-service";

/** V1 mock: simulates latency and returns a deterministic receipt. */
export class MockQuoteService implements QuoteService {
  async submit(request: QuoteRequest): Promise<QuoteResult> {
    await new Promise((r) => setTimeout(r, 600));
    return {
      id: `mock_${Date.now().toString(36)}`,
      status: "received",
      estimatedTurnaroundDays: request.service === "certified-translation" ? 2 : 3,
      message:
        "Your request was received. Our team replies the same business day.",
    };
  }
}
