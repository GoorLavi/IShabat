module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            ['module-resolver', {
                alias: {
                    // To make Webstorm recognize this aliases, add a copy with '/*' to .jsconfig.
                    "@styles": "./App/styles",
                    "@services": "./App/services",
                    "@globals": "./App/globals",
                    "@ads": "./App/ads",
                    "@commonComponents": "./commonComponents",
                    "@prototypes": "./prototypes",
                    "@assets": "./App/assets",
                    "@store": "./App/store"
                }
            }]
        ]
    };
};
