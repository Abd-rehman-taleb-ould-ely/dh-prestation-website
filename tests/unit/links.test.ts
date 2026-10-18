import { describe, expect, it } from 'vitest';
import { company } from '../../src/config/company';
import { formatAddress, formatPhone, mailtoHref, telHref } from '../../src/lib/contact';
import { whatsappDigits, whatsappHref } from '../../src/lib/whatsapp';

describe('WhatsApp links', () => {
  it('use the international number without plus sign, spaces or punctuation', () => {
    expect(whatsappDigits('+34 687 032 956')).toBe('34687032956');
    expect(whatsappHref(company.whatsapp)).toBe('https://wa.me/34687032956');
  });

  it('URL-encode the prefilled message so it round-trips exactly', () => {
    const message =
      'Hola, estoy interesado en conocer la capacidad de D.H. PRESTATION, S.L. para colaborar en un proyecto. ¿Podemos hablar sobre el alcance y los requisitos?';
    const href = whatsappHref(company.whatsapp, message);
    const url = new URL(href);
    expect(url.origin + url.pathname).toBe('https://wa.me/34687032956');
    expect(url.searchParams.get('text')).toBe(message);
    expect(href.split('?text=')[1]).not.toMatch(/[ ¿?,]/);
    expect(href).toContain('%C2%BF');
  });

  it('encode reserved characters such as & and #', () => {
    const url = new URL(whatsappHref(company.whatsapp, 'A & B #1 = 100%'));
    expect(url.searchParams.get('text')).toBe('A & B #1 = 100%');
  });
});

describe('contact helpers', () => {
  it('format Spanish phone numbers for display', () => {
    expect(formatPhone('+34624817846')).toBe('+34 624 817 846');
    expect(formatPhone('+34672546266')).toBe('+34 672 546 266');
    expect(formatPhone('+34687032956')).toBe('+34 687 032 956');
  });

  it('build tel: and mailto: links', () => {
    expect(telHref('+34 624 817 846')).toBe('tel:+34624817846');
    expect(company.phones.map(telHref)).toEqual(['tel:+34624817846', 'tel:+34672546266']);
    expect(mailtoHref(company.emails.general)).toBe('mailto:info@dhp.es');
    expect(mailtoHref(company.emails.management)).toBe('mailto:gerencia@dhp.es');
  });

  it('format the registered address', () => {
    expect(formatAddress(company.address)).toBe(
      'Calle María del Rocío 83 B, 41130 La Puebla del Río, Sevilla, España',
    );
  });
});
