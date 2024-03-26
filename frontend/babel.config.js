module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  env: {
    development: {
      compact: false,
    },
    production: {
      compact: true,
    },
  },
};