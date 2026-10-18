/**
 * Site-wide settings. Change `url` if the production domain changes; every canonical,
 * hreflang, sitemap and Open Graph URL is derived from it.
 */
export const site = {
  url: 'https://dhp-solar.site',
  themeColor: '#0B1F33',
  ogImage: '/og-image.jpg',

  /**
   * Shows a "draft — pending legal review" notice on the legal pages.
   * TODO(legal): set to false once a legal adviser has reviewed and approved the texts.
   */
  legalDraft: true,

  /**
   * The site currently uses rendered placeholder images. While true, the footer states
   * that images are illustrative. Keep it true for stock photography as well; set it to
   * false only when every image shows genuine company work.
   */
  illustrativeImages: true,
} as const;
