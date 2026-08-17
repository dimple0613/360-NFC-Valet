module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    overrides: [
      {
        test: /[\\/]src[\\/]/,
        plugins: ["./babel-plugin-font-alias.js"],
      },
    ],
  };
};
