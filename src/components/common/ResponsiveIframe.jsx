/* eslint-disable */

import React from "react";
import { EditableResponsiveIframe } from "react-easy-editables";

class EmbeddedIframe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { scrollEnabled: false }
  }

  enableScroll = () => { this.setState({ scrollEnabled: true }) }

  disableScroll = () => { this.setState({ scrollEnabled: false }) }

  render() {
    return (
      <div
        role="iframe-container"
        onClick={this.enableScroll}
        onMouseLeave={this.disableScroll}
        className={`iframe-container my-4 ${this.props.classes || ''} ${this.state.scrollEnabled ? "clicked" : ""}`}
      >
        <EditableResponsiveIframe iframeProps={{ allow: "geolocation" }} { ...this.props } />
      </div>
    );
  }
}

export default EmbeddedIframe;
