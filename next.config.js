const withTM = require('next-transpile-modules')(['@babylonjs/core']);
const withPlugins = require('next-compose-plugins');

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // compiler: {
  // default is true. It will be disabled when build type is production.
  // sourceMap: true,
  // default is 'dev-only'.
  // autoLabel: 'dev-only', // 'never' | 'dev-only' | 'always',
  // default is '[local]'.
  // Allowed values: `[local]` `[filename]` and `[dirname]`
  // This option only works when autoLabel is set to 'dev-only' or 'always'.
  // It allows you to define the format of the resulting label.
  // The format is defined via string where variable parts are enclosed in square brackets [].
  // For example labelFormat: "my-classname--[local]", where [local] will be replaced with the name of the variable the result is assigned to.
  // labelFormat?: string,
  // },
  experimental: {
    forceSwcTransforms: true,
  },
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
