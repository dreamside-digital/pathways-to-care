/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"
import favicon from '../assets/images/icon.png'

const SEO = ({ description, lang, meta, title, pathname, image }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            description
            keywords
            image
            url
          }
        }
      }
    `}
    render={data => {
      const { site } = data;
      const metaDescription = description || site.siteMetadata.description
      const fullUrl = `${site.siteMetadata.url}${pathname}`
      const imageSrc = image || `${site.siteMetadata.url}${site.siteMetadata.image}`

      return (
        <Helmet
          htmlAttributes={{
            lang,
          }}
          title={title}
          titleTemplate={`%s | ${site.siteMetadata.title}`}
          meta={[
            {
              name: `description`,
              content: metaDescription,
            },
            {
              name: `keywords`,
              content: site.siteMetadata.keywords,
            },
            {
              property: `og:title`,
              content: title,
            },
            {
              property: `og:description`,
              content: metaDescription,
            },
            {
              property: `og:url`,
              content: fullUrl,
            },
            {
              property: `og:image`,
              content: imageSrc,
            },
            {
              property: `og:type`,
              content: `website`,
            },
            {
              name: `twitter:card`,
              content: `summary`,
            },
            {
              name: `twitter:title`,
              content: title,
            },
            {
              name: `twitter:description`,
              content: metaDescription,
            },
            {
              name: `twitter:image`,
              content: imageSrc,
            },
          ].concat(meta)}
        />
      )
    }}
  />
)


SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  link: [],
  pathname: '/',
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  pathname: PropTypes.string,
  image: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  link: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
