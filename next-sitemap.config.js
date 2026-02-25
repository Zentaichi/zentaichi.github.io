/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://zentaichi.me',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/admin', '/private/*'],
};   