/* eslint-disable */

import React from "react";
import { EditableEmbeddedIframe } from "react-easy-editables";

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
        <EditableEmbeddedIframe { ...this.props } />
      </div>
    );
  }
}

export default EmbeddedIframe;
