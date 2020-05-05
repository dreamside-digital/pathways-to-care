import React from "react";
import slugify from "slugify";
import { find } from 'lodash';

import { connect } from "react-redux";
import {
  toggleNewPageModal,
  savePage,
  updateFirebaseData,
  fetchPages,
} from "../../redux/actions";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { PAGE_TYPES, CATEGORY_OPTIONS } from "../../utils/constants";

import defaultContentJSON from "../../fixtures/pageContent.json";

const mapStateToProps = state => {
  return {
    showNewPageModal: state.adminTools.showNewPageModal,
    options: state.adminTools.options || {},
    page: state.page.data,
    pages: state.pages.pages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleNewPageModal: () => {
      dispatch(toggleNewPageModal());
    },
    updateFirebaseData: (data, callback) => {
      dispatch(updateFirebaseData(data, callback))
    },
    savePage: (pageData, pageId) => {
      dispatch(savePage(pageData, pageId));
    },
    fetchPages: () => {
      dispatch(fetchPages())
    },
  };
};

const emptyPage = {
    title: "",
    description: "",
    category: CATEGORY_OPTIONS[0].value,
    type: PAGE_TYPES[0].value,
    content: defaultContentJSON,
    template: PAGE_TYPES[0].value.template,
  }

class CreatePageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page,
      errors: {},
    };
    this.updatePage = (field, value) => {
      this._updatePage(field, value);
    };
    this.onSubmit = () => {
      this._onSubmit();
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.options !== this.props.options) {
      this.setState({ page: this.props.options.new ? emptyPage : {
        ...this.props.page
      } })
    }

    if (!prevProps.showNewPageModal && this.props.showNewPageModal) {
      this.props.fetchPages()
      if (this.props.options.duplicate || this.props.options.translation) {
        const newPage = {
          ...this.props.page,
          title: `${this.props.page.title} (copy)`,
          next: null,
        }
        this.setState({ page: newPage, errors: {} })
      }
    }
  }

  _updatePage(field, value) {
    this.setState({
      errors: {
        ...this.state.errors,
        [field]: null
      },
      page: {
        ...this.state.page,
        [field]: value
      }
    });
  }

  isUniqueSlug = slug => {
    return !Boolean(this.props.pages[slug])
  }

  newPage = () => {
    const pageId = slugify(this.state.page.title, {
      lower: true,
      remove: /[$*_+~.,()'"!\-:@%^&?=]/g
    })

    if (!this.isUniqueSlug(pageId)) {
      return this.setState({
        errors: {
          ...this.state.errors,
          title: "The page title must be unique."
        }
      })
    }

    const prevPage = find(this.props.pages, (page => page.category === this.state.page.category && !page.next));

    let pageData = {
      ...this.state.page,
      id: pageId,
      slug: `/${this.state.page.category}/${pageId}`,
      next: null,
      content: {
        ...this.state.page.content,
        "page-title": { text: this.state.page.title }
      }
    };

    this.props.savePage(pageData, pageId);

    if (this.state.page.category !== CATEGORY_OPTIONS[1].value && prevPage) { // don't add next page for uncategorized pages
      this.props.updateFirebaseData({
        [`pages/${prevPage.id}/next`]: pageId,
      })
    }
  }

  editPage = () => {
    let pageData = {
      ...this.state.page,
      content: {
        ...this.state.page.content,
        "page-title": { text: this.state.page.title }
      }
    };
    this.props.savePage(pageData, this.props.page.id);
  }

  _onSubmit() {
    if (this.props.options.edit) {
      return this.editPage()
    }

    return this.newPage()
  }

  render() {
    const open = Boolean(this.props.showNewPageModal);

    return (
      <Dialog open={open} aria-labelledby="create-page-dialogue">
        <DialogTitle id="create-page-dialogue">
          {"Page Configuration"}
        </DialogTitle>


        <DialogContent>
          <FormControl fullWidth margin="normal">
            <TextField
              type="text"
              error={Boolean(this.state.errors.title)}
              helperText={this.state.errors.title}
              label={"Page title"}
              value={this.state.page.title}
              onChange={e => this.updatePage("title", e.currentTarget.value)}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              type="text"
              label={"Short description"}
              value={this.state.page.description}
              onChange={e => this.updatePage("description", e.currentTarget.value)}
            />
          </FormControl>

          {
            this.props.options.new &&
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="menu-group">Category</InputLabel>
              <Select
                value={this.state.page.category}
                onChange={selected =>
                  this.updatePage("category", selected.target.value)
                }
                inputProps={{
                  name: "menu-group",
                  id: "menu-group"
                }}
              >
                {CATEGORY_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          }

        </DialogContent>

        <DialogActions>
          <Button color="default" onClick={this.props.onToggleNewPageModal}>
            Close
          </Button>
          <Button color="primary" onClick={this.onSubmit}>
            { (this.props.options.new || this.props.options.duplicate) ? "Create page" : "Save" }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}


CreatePageModal.defaultProps = {
  page: emptyPage
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CreatePageModal
);
