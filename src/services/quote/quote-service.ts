import type { QuoteRequest, QuoteResult } from "@/types";

/**
 * Provider-agnostic contract. UI code depends on this interface only.
 * Real implementations (API/Supabase/email) slot in behind the factory
 * in services/index.ts without touching a single component.
 */
export interface QuoteService {
  submit(request: QuoteRequest): Promise<QuoteResult>;
}
