import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CopyIcon from "@material-ui/icons/FileCopy";
import AddIcon from "@material-ui/icons/Add";
import LabelIcon from "@material-ui/icons/Label";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  editActions: {
    display: "flex",
    justifyContent: "center",
    right: "45%",
    bottom: 0,
    zIndex: "99",
    position: "absolute"
  },
  button: {
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #000",
    height: "30px",
    width: "30px",
    padding: "unset",
    margin: "4px",
    "&:hover": {
      backgroundColor: "#eee"
    }
  },
  icon: {
    fontSize: "16px"
  }
};

class SectionEditingActions extends React.Component {
  state = {
    anchorEl: null,
  };

  openMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  closeMenu = e => {
    this.setState({ anchorEl: null });
  };

  render() {
    const open = Boolean(this.state.anchorEl);

    return (
      <div className={this.props.classes.editActions}>
        {this.props.onDuplicateSection && (
          <IconButton
            onClick={this.props.onDuplicateSection}
            className={this.props.classes.button}
            title={"Duplicate section"}
          >
            <CopyIcon className={this.props.classes.icon} />
          </IconButton>
        )}
        {this.props.onDeleteSection && (
          <IconButton
            onClick={this.props.onDeleteSection}
            className={this.props.classes.button}
            title={"Delete section"}
          >
            <DeleteIcon className={this.props.classes.icon} />
          </IconButton>
        )}

        {this.props.onAddContentItem && (
          <div>
            <IconButton
              aria-owns={open ? "menu-add-content" : null}
              aria-haspopup="true"
              onClick={this.openMenu}
              className={this.props.classes.button}
            >
              <AddIcon className={this.props.classes.icon} />
            </IconButton>
            <Menu
              id="menu-add-content"
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={open}
              onClose={this.closeMenu}
            >
              <MenuItem onClick={() => this.props.onAddContentItem("header")}>
                Header
              </MenuItem>

              <MenuItem onClick={() => this.props.onAddContentItem("paragraph")}>
                Paragraph
              </MenuItem>

              <MenuItem onClick={() => this.props.onAddContentItem("quote")}>
                Quote
              </MenuItem>

              <MenuItem onClick={() => this.props.onAddContentItem("button")}>
                Button
              </MenuItem>

              <MenuItem onClick={() => this.props.onAddContentItem("link")}>
                Link
              </MenuItem>

              <MenuItem onClick={() => this.props.onAddContentItem("image")}>
                Image
              </MenuItem>

              <MenuItem onClick={() => this.props.onAddContentItem("expandableText")} divider>
                Expandable text
              </MenuItem>

              <MenuItem onClick={() => this.props.onAddSection("default")}>
                Empty Section
              </MenuItem>

              <MenuItem onClick={() => this.props.onAddSection("highlight")}>
                Highlight Section
              </MenuItem>

              <MenuItem onClick={() => this.props.onAddSection("report")}>
                Embedded Report Section
              </MenuItem>

              <MenuItem onClick={() => this.props.onAddSection("download")}>
                Download PDF Section
              </MenuItem>

              <MenuItem onClick={() => this.props.onAddSection("research")}>
                Additional Research Section
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(SectionEditingActions);
