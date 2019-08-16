const firebaseConfig = require("./config/firebase-config.json")

module.exports = {
  siteMetadata: {
    title: 'Pathways to Care',
    description:
      "Improving Mental Health & Addictions Care For Black Children & Youth",
    url: "https://www.pathwaystocare.ca", // No trailing slash allowed!
    image: "/ptc-header.png", // Path to your image you placed in the 'static' folder
    keywords: "Pathways to Care, Black Health Alliance, mental health, additions, black community, community building, children and youth, black families"
  },
  pathPrefix: `/`,
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "process.env.GATSBY_PROJECT_TITLE",
        short_name: "process.env.GATSBY_PROJECT_TITLE",
        start_url: "/",
        background_color: "#000",
        theme_color: "#FCB239", // yellow
        display: "minimal-ui",
        icon: "./src/assets/images/icon.png" // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-firebase",
      options: {
        credential: firebaseConfig.serviceAccountKey,
        databaseURL: firebaseConfig.databaseURL,
        types: [
          {
            type: "Pages",
            path: "pages",
            map: node => {
              node.content = JSON.stringify(node.content);

              return node
            },
          },
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-145826669-1",
      },
    },
  ]
};
