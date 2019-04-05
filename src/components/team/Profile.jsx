import React, { Component } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

import {
  EditableText,
  EditableParagraph,
  EditableImageUpload,
} from 'react-easy-editables';



class Profile extends Component {
  state = {
    showFullBio: false
  }

  onSavePassthrough = id => editedContent => {
    const newContent = { ...this.props.content, [id]: editedContent }
    this.props.onSave(newContent);
  };

  onToggleModal = () => {
    this.setState({ showFullBio: !this.state.showFullBio })
  }

  render() {
    const content = this.props.content || {};
    console.log(content)


    return (
      <div className="team-member">
        <div className="team-images">
          <EditableImageUpload content={ content["headshot"]} onSave={this.onSavePassthrough("headshot")} />
        </div>
        <div className="team-description">
          <EditableText content={content["position"]} onSave={this.onSavePassthrough("position")} />
          <h5><EditableText content={content["name"]} onSave={this.onSavePassthrough("name")} /></h5>
          <EditableParagraph content={content["quote"]} onSave={this.onSavePassthrough("quote")} />
          <div><button onClick={ this.onToggleModal } className="btn btn-theme">Full bio</button></div>
        </div>
        <Dialog
          onClose={this.onToggleModal}
          aria-labelledby="registration-dialogue"
          open={this.state.showFullBio}
        >
          <DialogTitle id="registration-dialogue">{content["name"] ? content["name"]["text"] : ""}</DialogTitle>
          <DialogContent className="modal-body">
            <EditableParagraph content={content["fullBio"]} onSave={this.onSavePassthrough("fullBio")} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default Profile;
