import type { ImageId, ServiceId } from '../i18n';

export interface ServiceDefinition {
  id: ServiceId;
  image: ImageId;
  /** Core services lead the page; secondary activities are shown more compactly. */
  tier: 'core' | 'secondary';
}

/** Order here is the display order on the site. Copy lives in the locale files. */
export const SERVICES: ServiceDefinition[] = [
  { id: 'structures', image: 'structures', tier: 'core' },
  { id: 'trackers', image: 'trackers', tier: 'core' },
  { id: 'modules', image: 'modules', tier: 'core' },
  { id: 'electrical', image: 'electrical', tier: 'core' },
  { id: 'subcontracting', image: 'subcontracting', tier: 'core' },
  { id: 'construction', image: 'construction', tier: 'secondary' },
  { id: 'machinery', image: 'machinery', tier: 'secondary' },
];

export const CORE_SERVICES = SERVICES.filter((s) => s.tier === 'core');
export const SECONDARY_SERVICES = SERVICES.filter((s) => s.tier === 'secondary');

/** DOM id of a service card, used by in-page links. */
export const serviceAnchor = (id: ServiceId) => `service-${id}`;
