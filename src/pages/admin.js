import React from 'react'
import { Link } from 'gatsby'
import { connect } from "react-redux";
import { filter, find, map } from 'lodash'
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowUp from '@material-ui/icons/KeyboardArrowUp';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { EditableText } from "react-easy-editables";


import Layout from '../layouts/default';
import ProtectedPage from "../layouts/protected-page"

import { PERMANENT_PAGES, PAGE_TYPES } from "../utils/constants"

import {
  fetchPages,
  updateFirebaseData,
  deploy,
} from "../redux/actions";


const mapDispatchToProps = dispatch => {
  return {
    updateFirebaseData: (data, callback) => {
      dispatch(updateFirebaseData(data, callback))
    },
    fetchPages: () => {
      dispatch(fetchPages())
    },
    deploy: () => {
      dispatch(deploy())
    },
  };
};

const mapStateToProps = state => {
  return {
    isEditingPage: state.adminTools.isEditingPage,
    pages: state.pages.pages,
  };
};

class AdminPage extends React.Component {
  componentDidMount() {
    this.props.fetchPages()
  }

  filterPagesByType = (pages, typeId) => {
    console.log('pages', pages)
    console.log('typeId', typeId)
    return filter(pages, page => (page.type && (page.type.id === typeId)));
  }

  nextPage = page => {
    return this.props.pages[page.next];
  }

  prevPage = page => {
    return find(this.props.pages, p => p.next === page.id)
  }

  orderedPages = (page, arr=[]) => {
    if (!page) {
      return arr
    }

    if (arr.includes(page)) {
      return arr
    }

    arr.push(page)

    const nextPage = this.nextPage(page)
    if (page === nextPage) {
      return arr
    }
    return this.orderedPages(this.nextPage(page), arr)
  }

  movePageForward = currentPage => () => {
    if (!currentPage.next) return false;

    const nextPage = this.nextPage(currentPage)
    const prevPage = this.prevPage(currentPage)

    let dataToUpdate = {
      [`pages/${currentPage.id}/next`]: nextPage.next || null,
      [`pages/${nextPage.id}/next`]: currentPage.id,
    }

    if (currentPage.head) {
      dataToUpdate[`pages/${nextPage.id}/head`] = true
      dataToUpdate[`pages/${currentPage.id}/head`] = null
    }

    if (prevPage) {
      dataToUpdate[`pages/${prevPage.id}/next`] = nextPage.id
    }

    this.props.updateFirebaseData(dataToUpdate, this.props.fetchPages)
  }

  movePageBack = currentPage => () => {
    const prevPage = this.prevPage(currentPage)
    if (!prevPage) return false

    const prevPrevPage = this.prevPage(prevPage)

    let dataToUpdate = {
      [`pages/${currentPage.id}/next`]: prevPage.id,
      [`pages/${prevPage.id}/next`]: currentPage.next || null,
    }

    if (prevPage.head) {
      dataToUpdate[`pages/${currentPage.id}/head`] = true
      dataToUpdate[`pages/${prevPage.id}/head`] = null
    }

    if (prevPrevPage) {
      dataToUpdate[`pages/${prevPrevPage.id}/next`] = currentPage.id
    }

    this.props.updateFirebaseData(dataToUpdate, this.props.fetchPages)
  }

  deletePage = page => () => {
    if (typeof window !== 'undefined')  {
      if (!window.confirm("Are you sure you want to delete this page?")) {
        return false
      }
    }

    const prevPage = this.prevPage(page)
    const nextPage = this.nextPage(page)

    let dataToUpdate = {
      [`pages/${page.id}`]: null,
    }

    if (prevPage) {
      dataToUpdate[`pages/${prevPage.id}/next`] = page.next || null
    }

    if (page.head && nextPage) {
      dataToUpdate[`pages/${nextPage.id}/head`] = true
    }

    this.props.updateFirebaseData(dataToUpdate, this.props.fetchPages)
  }

  render() {
    const unorderedPages = filter(this.props.pages, page => !page.type || page.type.id === "custom")
    const pagesByType = [];

    PAGE_TYPES.forEach(type => {
      const typePages = this.filterPagesByType(this.props.pages, type.value.id)
      const pages = this.orderedPages(typePages.find(page => page.head))

      if (pages.length > 0) {
        pagesByType.push({ ...type, pages })
      }
    })

    return(
      <Layout className="admin-page">
        <ProtectedPage>
          <div className="page-content" style={{ paddingTop: '100px' }}>
            <Container className="my-40">
              <h1 className="text-center">
                Website Configuration
              </h1>
            </Container>

            <Container className="my-40">
              <h2>Pages by Category</h2>
              <div className="my-40">
                {
                  pagesByType.map(type => {
                    return(
                      <div key={type.value.id}>
                        <h3 className="mt-3">{type.label}</h3>
                        {
                          type.pages.map(page => {
                            return(
                              <div className="ranked-item" key={page.id}>
                                {/*
                                  <IconButton size="small" color="primary" onClick={this.movePageBack(page)} disabled={page.head}><ArrowUp /></IconButton>
                                  <IconButton size="small" color="primary" onClick={this.movePageForward(page)} disabled={!page.next}><ArrowDown /></IconButton>
                                */}
                                <IconButton size="small" color="primary" onClick={this.deletePage(page)} disabled={PERMANENT_PAGES.includes(page.id)}><DeleteForever /></IconButton>
                                <span className="ml-3"><Link to={page.slug}>{page.title}</Link></span>
                              </div>
                            )
                          })
                        }
                      </div>
                    )
                  })
                }
              </div>
            </Container>

            <Container className="my-40">
              <h2>Custom Pages</h2>
              <div className="my-40">
                {
                  unorderedPages.map(page => {
                    return(
                      <div className="ranked-item" key={page.id}>
                        <IconButton size="small" color="primary" onClick={this.deletePage(page)} disabled={PERMANENT_PAGES.includes(page.id)}><DeleteForever /></IconButton>
                        <span className="ml-3"><Link to={page.slug}>{page.title}</Link></span>
                      </div>
                    )
                  })
                }
              </div>
            </Container>

            <Container className="my-40">
              <div className="my-40">
                <Button onClick={this.props.deploy} variant="contained" color="primary">Publish changes</Button>
              </div>
            </Container>
          </div>
        </ProtectedPage>
      </Layout>
    )
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
