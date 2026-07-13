/** Shared domain types. Grows with the platform; V1 keeps it lean. */

export type LanguageCode = string;

export interface LanguagePair {
  source: LanguageCode;
  target: LanguageCode;
}

export type ServiceKind =
  | "certified-translation"
  | "document-translation"
  | "transcription"
  | "subtitling"
  | "localization"
  | "proofreading";

export interface QuoteRequest {
  name: string;
  email: string;
  service: ServiceKind;
  pair: LanguagePair;
  details?: string;
  /** V1: files are captured in the UI only; upload wiring lands with backend. */
  fileNames?: string[];
}

export interface QuoteResult {
  id: string;
  status: "received" | "estimated";
  estimatedTurnaroundDays?: number;
  message: string;
}
