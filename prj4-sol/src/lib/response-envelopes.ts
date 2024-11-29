/** A link contains a href URL and HTTP method */
export type Link = {
  rel: string;
  href: string;
  method: string;
};

/** A self link using rel self */
export type SelfLinks = {
  self: Link & { rel: 'self' };
};

/** Navigation links contain optional next and prev links in addition to a self link */
export type NavLinks = SelfLinks & {
  next?: Link & { rel: 'next' };
  prev?: Link & { rel: 'prev' };
};

/** A result of type T which has links containing a self-link */
export type LinkedResult<T> = {
  links: SelfLinks;
  result: T;
};

/** A response envelope always has an isOk and HTTP status */
type EnvelopeBase = {
  isOk: boolean;
  status: number;
};

/** An envelope for a non-paged successful response */
export type SuccessEnvelope<T> = EnvelopeBase & LinkedResult<T> & {
  isOk: true;
};

/** An envelope for a paged successful response */
export type PagedEnvelope<T> = EnvelopeBase & {
  isOk: true;
  links: NavLinks;
  result: LinkedResult<T>[];
};

/** An envelope for a failed response */
export type ErrorDetail = {
  message: string;
  options?: { [key: string]: string };
};

export type ErrorEnvelope = EnvelopeBase & {
  isOk: false;
  errors: ErrorDetail[];
};

/** A union type representing all possible envelope types */
export type Envelope<T> = SuccessEnvelope<T> | PagedEnvelope<T> | ErrorEnvelope;

/**
 * Type guard for SuccessEnvelope<T>
 * Checks if the envelope is a successful, non-paged response.
 */
export function isSuccessEnvelope<T>(envelope: Envelope<T>): envelope is SuccessEnvelope<T> {
  return envelope.isOk === true && 'result' in envelope && !Array.isArray(envelope.result);
}

/**
 * Type guard for PagedEnvelope<T>
 * Checks if the envelope is a successful, paged response.
 */
export function isPagedEnvelope<T>(envelope: Envelope<T>): envelope is PagedEnvelope<T> {
  return envelope.isOk === true && 'result' in envelope && Array.isArray(envelope.result);
}

/**
 * Type guard for ErrorEnvelope
 * Checks if the envelope represents an error response.
 */
export function isErrorEnvelope<T>(envelope: Envelope<T>): envelope is ErrorEnvelope {
  return envelope.isOk === false && 'errors' in envelope;
}
