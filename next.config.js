const withTM = require('next-transpile-modules')(['@babylonjs/core']);
const withPlugins = require('next-compose-plugins');

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  assetPrefix: isProd ? 'https://d9x1g5sz86pe3.cloudfront.net' : '',
  reactStrictMode: true,
  trailingSlash: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = withPlugins([withTM], nextConfig);
