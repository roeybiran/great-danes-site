/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

module.exports = nextConfig;

/*
const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    config.resolve.alias.react = path.resolve('./node_modules/react');
    config.resolve.alias['styled-components'] = path.resolve(
      './node_modules/styled-components'
    );
    if (!isServer) {
      config.resolve.fallback.fs = false;
      // config.resolve.fallback.child_process = false;
      // config.resolve.fallback.path = false;
      // config.resolve.fallback.process = false;
    }
    return config;
  },
};

*/
