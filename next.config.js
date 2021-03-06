module.exports = {
  target: 'serverless',
  images: {
    domains: ['rdl.ink', 'www.notion.so'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    config.module.rules.push({
      test: /\.md|\.mdx$/,
      use: 'raw-loader',
    });

    return config;
  },
};
