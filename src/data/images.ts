import type { ImageMetadata } from 'astro';
import type { ImageId } from '../i18n';

/**
 * Image registry. To replace an image, drop a new file into src/assets/images/ with the
 * same base name (jpg, jpeg, png, webp or avif) and update its alt text in the locale files
 * (`images` key). Astro generates responsive AVIF/WebP versions at build time.
 *
 * `position` sets the focal point used when the image is cropped (CSS object-position).
 */
export const IMAGE_FILES: Record<ImageId, { file: string; position?: string }> = {
  hero: { file: 'hero-solar-plant', position: '65% 50%' },
  structures: { file: 'service-structures' },
  trackers: { file: 'service-trackers' },
  modules: { file: 'service-modules' },
  electrical: { file: 'service-electrical' },
  subcontracting: { file: 'service-subcontracting' },
  construction: { file: 'service-construction' },
  machinery: { file: 'service-machinery' },
  company: { file: 'company-site' },
};

const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/images/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const byBaseName = new Map(
  Object.entries(files).map(([path, mod]) => [
    path
      .split('/')
      .pop()!
      .replace(/\.[^.]+$/, ''),
    mod.default,
  ]),
);

export function getImage(id: ImageId): { src: ImageMetadata; position: string } {
  const entry = IMAGE_FILES[id];
  const src = byBaseName.get(entry.file);
  if (!src) {
    throw new Error(
      `Missing image "${entry.file}" for "${id}". Add it to src/assets/images/ (see README → Images).`,
    );
  }
  return { src, position: entry.position ?? '50% 50%' };
}
