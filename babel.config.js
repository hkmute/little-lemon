module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            assets: "./assets",
            context: "./src/context",
            components: "./src/components",
            navigation: "./src/navigation",
            screens: "./src/screens",
            styles: "./src/styles",
            utils: "./src/utils",
          },
        },
      ],
    ],
  };
};
