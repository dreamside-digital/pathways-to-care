import React from "react";
import PropTypes from "prop-types";

import { Editable, EmbeddedIFrameEditor } from "react-easy-editables";


const EmbeddedIframe = ({ className, ...props }) => {
  const handleSave = newContent => {
    props.onSave(newContent);
  };

  const { src, height, width, allowFullScreen, title } = props.content;
  const ratio = (parseInt(height) / parseInt(width)) * 100

  const styles = {
    iframeContainer: {
      position: "relative",
      paddingBottom: `${ratio}%`,
      height: 0,
      overflow: "hidden",
      width: "100%",
      maxWidth: "100%",
    },
    iframe: {
      position: absolute,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    }
  }

  return (
    <Editable
      Editor={EmbeddedIframeEditor}
      handleSave={handleSave}
      content={{ src: src }}
      {...props}
    >
      <div className="embedded-iframe" style={styles.iframeContainer}>
        <iframe
          title="iframe"
          src={ src }
          style={styles.iframe}
          frameBorder="0"
          allowFullScreen={ true }
          height={ height }
          width={ width }
          title={ title }
        />
      </div>
    </Editable>
  );
};

EmbeddedIframe.propTypes = {
  content: PropTypes.shape({
    src: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    allowFullScreen: PropTypes.boolean,
    title: PropTypes.string
  }).isRequired,
  onSave: PropTypes.func.isRequired,
}

EmbeddedIframe.defaultProps = {
  content: {
    src: 'https://my.visme.co/embed/1jr3q6km-pathways-to-care-report',
    height: '1056',
    width: '816',
    title: 'Timeline',
  },
  onSave: newContent => console.log('Implement a function to save changes!', newContent),
}

export default EmbeddedIframe;
