const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  reactStrictMode: true,
  assetPrefix: isProd ? 'https://d9x1g5sz86pe3.cloudfront.net' : '',
}
