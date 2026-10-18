/**
 * Builds a click-to-chat link: https://wa.me/<digits>?text=<url-encoded message>
 *
 * The link only opens WhatsApp on the visitor's device or browser with the message
 * prefilled. Nothing is sent until the visitor reviews the text and presses send.
 */
export function whatsappDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function whatsappHref(phone: string, message?: string): string {
  const base = `https://wa.me/${whatsappDigits(phone)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
