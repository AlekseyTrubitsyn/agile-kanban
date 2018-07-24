import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './assets/styles_css/normalize.css';
import './assets/styles_css/App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faClipboard, faUmbrella, faCoffee, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import LoginRegisterForm from './containers/LoginRegisterForm';
import KanbanBoard from './containers/KanbanBoard';
import Header from './containers/Header';

library.add(fab, faClipboard, faCoffee, faUmbrella, faSignOutAlt);

const App = (props) => {
  const {showLoginForm} = props;

  return (
    <div className="App">
      {showLoginForm && <LoginRegisterForm />}
      {!showLoginForm && (
        <Fragment>
          <Header />
          <KanbanBoard />
        </Fragment>
      )}
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    showLoginForm: !state.user.userData
  }
}

export default connect(mapStateToProps)(App);
