module.exports = {
  root: true,
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      0,
      {
        endOfLine: 'auto',
      },
    ],
  },
  ignorePatterns: ['.eslintrc.js'],
};
