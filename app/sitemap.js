import { getAllProviderSlugs } from './lib/providers';

export default function sitemap() {
  const baseUrl = 'https://apiguardrails.com';
  const providerSlugs = getAllProviderSlugs();

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/providers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...providerSlugs.map((slug) => ({
      url: `${baseUrl}/providers/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
