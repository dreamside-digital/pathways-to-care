import React from "react"
import PropTypes from "prop-types"
import { withPrefix } from 'gatsby'

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
          <script src={ withPrefix("/js/jquery.3.3.1.min.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/popper.min.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/bootstrap.min.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/jquery.appear.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/modernizr.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/magnific-popup/jquery.magnific-popup.min.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/owl-carousel/owl.carousel.min.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/counter/counter.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/countdown/jquery.countdown.min.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/isotope/isotope.pkgd.min.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/mouse-parallax/tweenmax.min.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/mouse-parallax/jquery-parallax.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/contact-form/contact-form.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/contact-form/jquery.validate.min.js")} type="text/javascript"></script>

          <script src={"https://maps.googleapis.com/maps/api/js?key=AIzaSyDsXmgBWiCiuRzWQz4I5ClTGxfFPl01EGY"} type="text/javascript"></script>
          <script src={ withPrefix("/js/map.js")} type="text/javascript"></script>

          <script src={ withPrefix("/js/wow.min.js")} type="text/javascript"></script>
          <script src={ withPrefix("/js/theme-script.js")} type="text/javascript"></script>
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
