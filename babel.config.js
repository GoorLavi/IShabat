module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { unstable_transformImportMeta: true }]],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            // To make Webstorm recognize this aliases, add a copy with '/*' to .jsconfig.
            "@styles": "./App/styles",
            "@services": "./App/services",
            "@globals": "./App/globals",
            "@commonComponents": "./commonComponents",
            "@prototypes": "./prototypes",
            "@assets": "./App/assets",
            "@store": "./App/store",
          },
        },
      ],
    ],
  };
};
