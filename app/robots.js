export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://apiguardrails.com/sitemap.xml',
  };
}
