import type { Company } from '../config/company';

/** "+34624817846" → "+34 624 817 846" (Spanish 9-digit numbering). */
export function formatPhone(e164: string): string {
  const match = /^\+34(\d{3})(\d{3})(\d{3})$/.exec(e164);
  return match ? `+34 ${match[1]} ${match[2]} ${match[3]}` : e164;
}

/** tel: URI. Keeps only the leading plus and digits. */
export function telHref(e164: string): string {
  return `tel:${e164.replace(/[^\d+]/g, '')}`;
}

export function mailtoHref(email: string): string {
  return `mailto:${email}`;
}

export function formatAddress(a: Company['address']): string {
  return `${a.street}, ${a.postalCode} ${a.locality}, ${a.region}, ${a.country}`;
}
