import { MockQuoteService } from "./quote/mock-quote-service";
import type { QuoteService } from "./quote/quote-service";

/**
 * Service locator / factory.
 * Providers are chosen by environment variable, never imported directly
 * by features. Adding a real provider = add a case, set an env var.
 */
export function getQuoteService(): QuoteService {
  const provider = process.env.QUOTE_SERVICE_PROVIDER ?? "mock";
  switch (provider) {
    case "mock":
    default:
      return new MockQuoteService();
  }
}
