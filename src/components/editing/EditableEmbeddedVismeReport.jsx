import React from "react";
import TextField from '@material-ui/core/TextField';

import {
  PlainTextEditor,
  Editable
} from 'react-easy-editables';

const styles = {
  textField: {
    width: "100%",
    fontSize: "inherit",
    fontFamily: "inherit",
    fontWeight: "inherit",
    color: "rgba(0,0,0,0.8)",
    backgroundColor: "#fff",
  },
  input: {
    borderRadius: '0'
  },
};


class VismeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: this.props.content };
  }

  handleEditorChange = field => text => {
    this.setState({
      content: {
        ...this.state.content,
        [field]: {
          text: text
        }
      }
    });
  }

  render() {
    const { content } = this.state;
    const value = content["visme-embed-code"]["text"]

    return(
      <TextField
        id="iframe-src"
        label="Iframe source URL"
        style={styles.textField}
        value={value}
        onChange={this.handleEditorChange("visme-embed-code")}
        helperText="In the embed code, copy everything after the script tag."
        required
        variant="outlined"
        size="small"
        margin="dense"
        InputProps={{ style: styles.input }}
      />
    )
  }
}

const EmbeddedVismeReport = props => {

  const content = props.content || {};

  const handleSave = newContent => {
    props.onSave(newContent)
  }

  return (
    <Editable
      Editor={VismeEditor}
      handleSave={handleSave}
      content={content}
      {...props}
    >
      <div className={"visme-embed"} dangerouslySetInnerHTML={ {__html: content["visme-embed-code"]["text"]} } />
    </Editable>
  );
};

EmbeddedVismeReport.defaultProps = {
  content: {
    "visme-embed-code": { "text": `<div className="visme_d" data-url="1jr3q6km-pathways-to-care-report" data-w="816" data-h="1056" data-domain="my"></div>` },
  },
  classes: "",
  onSave: () => { console.log('implement a function to save changes') }
}

export default EmbeddedVismeReport;
