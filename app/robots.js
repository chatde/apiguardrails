export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://apiguardrails.com/sitemap.xml',
  };
}
