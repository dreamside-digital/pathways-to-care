const path = require("path");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Pages implements Node {
      title: String!
      slug: String!
      template: String!
      content: JSON!
      next: String
      head: Boolean
      description: String
      displayTitle: String
    }
  `
  createTypes(typeDefs)
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
      graphql(
        `
          {
          allPages(filter: {template: { in: ["report-page.js", "default.js"]}}) {
            edges {
              node {
                id
                title
                slug
                template
                content
                next
                head
                description
              }
            }
          }
        }
        `
      ).then(result => {
        if (result.errors) {
          console.log("ERROR CREATING PAGES", result.errors);
          reject(result.errors);
        }

        result.data.allPages.edges.forEach(edge => {
          const template = path.resolve(
            `src/templates/${edge.node.template}`
          );

          console.log("CREATING PAGE", edge.node.title);
          createPage({
            path: edge.node.slug, // required
            component: template,
            layout: "default",
            context: {
              slug: edge.node.slug
            }
          });
        });

        resolve();
      })
  });
};


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