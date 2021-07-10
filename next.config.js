const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  assetPrefix: isProd ? 'https://d9x1g5sz86pe3.cloudfront.net' : '',
  reactStrictMode: true,
  trailingSlash: true,
}
