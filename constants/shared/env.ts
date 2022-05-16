export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export const isProd = process.env.NODE_ENV !== 'development';

export const isDev = process.env.NODE_ENV !== 'development';

export const prodUrl = 'https://illmith.com';

export const NODE_ENV = process.env.NODE_ENV;

export const PORT = process.env.PORT || 3000;
