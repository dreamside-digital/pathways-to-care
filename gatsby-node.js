const path = require("path");


exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
          'react': path.resolve(__dirname, './node_modules/react'),
          'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      }
    }
  });

  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-rte/,
            use: loaders.null(),
          },
          {
            test: /mapbox-gl/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}