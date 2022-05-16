// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = {
  reactStrictMode: true,
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ['assets.vercel.com'],
    formats: ['image/avif', 'image/webp'],
  },
};
