module.exports = api => {
  api.cache.never()
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            browsers: api.env.which === "EDITOR" ? ["last 2 versions", "not ie"] : ["ie>=11"]
          },
          // include: ["es7.array.*", "es6.array.*"], // changes nothing!
          debug: false,
          modules: "commonjs",
          useBuiltIns: "usage"
        }
      ],
      ["@babel/preset-react"]
    ],
    plugins: [
      [
        "@babel/plugin-proposal-decorators",
        {
          legacy: true
        }
      ],
      [
        "@babel/plugin-transform-runtime"
        // {
        //   corejs: false,
        //   helpers: true,
        //   regenerator: true,
        //   useESModules: false
        // }
      ],
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-function-bind",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-react-jsx",
      // "@babel/transform-export-extensions",
      "@babel/plugin-transform-regenerator"
    ]
  }
}
