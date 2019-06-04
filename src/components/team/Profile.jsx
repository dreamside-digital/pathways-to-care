import React, { Component } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

import {
  EditableText,
  EditableParagraph,
  EditableImageUpload,
} from 'react-easy-editables';

import { uploadImage } from "../../firebase/operations";


class Profile extends Component {
  render() {
    const content = this.props.content || {};

    return (
      <div className="team-member mb-4">
        <div className="row align-items-center">
          <div className="col-md-4">
            <div className="team-images">
              <EditableImageUpload
                content={ content["headshot"]}
                onSave={this.props.onSave("headshot")}
                uploadImage={ uploadImage }
              />
            </div>
          </div>

          <div className="col-md-8">
            <div className="team-description">
              <strong><EditableText content={content["position"]} onSave={this.props.onSave("position")} /></strong>
              <h3 className="text-theme mt-2"><EditableText content={content["name"]} onSave={this.props.onSave("name")} /></h3>
              <EditableParagraph classes="quote" content={content["quote"]} onSave={this.props.onSave("quote")} />
            </div>
          </div>

        </div>

        <div className="row">
          <div className="col-12">
             <div className="team-description">
              <EditableParagraph content={content["fullBio"]} onSave={this.props.onSave("fullBio")} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
