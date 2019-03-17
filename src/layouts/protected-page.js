import React from "react";
import { connect } from "react-redux";
// import { push } from 'gatsby';

const mapStateToProps = state => {
  const allowEditing = state.adminTools.user && state.adminTools.user.isEditor;

  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    allowEditing: allowEditing,
    user: state.adminTools.user
  };
};

const ProtectedPage = props => {
  if (props.editor && props.allowEditing) {
    return <div>{props.children}</div>
  }

  if (!props.editor && props.isLoggedIn) {
    return <div>{props.children}</div>
  }

  return (
    <section>
      <div className="container">
        <p>You are not authorized to view this page.</p>
        <p>(Are you logged in?)</p>
      </div>
    </section>
  )
}


export default connect(mapStateToProps, null)(ProtectedPage);