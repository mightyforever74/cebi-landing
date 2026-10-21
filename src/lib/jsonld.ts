/**
 * Minimal JSON-LD for a single-page, single-tenant site: Organization + WebSite on
 * the home page only. No pricing offers, no locale clustering (unlike the
 * tulipfleet-landing source this repo was forked from).
 */
const ORG_ID = '#organization';
const WEBSITE_ID = '#website';

function absoluteId(site: URL, hash: string): string {
  return new URL(hash, site).href;
}

function organizationNode(site: URL) {
  return {
    '@type': 'Organization',
    '@id': absoluteId(site, ORG_ID),
    name: 'Cebi',
    url: site.href,
    email: 'info@tulipfleet.com',
    founder: {
      '@type': 'Person',
      name: 'Cem Sahinkaya',
    },
  };
}

function websiteNode(site: URL, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteId(site, WEBSITE_ID),
    name: 'Cebi',
    description,
    url: site.href,
    inLanguage: 'tr-TR',
    publisher: { '@id': absoluteId(site, ORG_ID) },
  };
}

export function buildHomeJsonLd(opts: { site: URL; description: string }): Record<string, unknown>[] {
  return [
    {
      '@context': 'https://schema.org',
      ...organizationNode(opts.site),
    },
    websiteNode(opts.site, opts.description),
  ];
}
