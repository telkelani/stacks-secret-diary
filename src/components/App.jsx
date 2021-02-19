import React, { Component, useState } from 'react';
import { CovertPage } from './Covert'
import { Signin } from './Signin';
import { HiddenPage } from './HiddenPage';
import { userSession } from '../auth';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import { v4 as uuid } from 'uuid';

import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {
  state = {
    userData: null
  };

  handleSignOut(e) {
    e.preventDefault();
    this.setState({ userData: null });
    userSession.signUserOut(window.location.origin);
  }

  generateRoute(){
    var crypto = require("crypto")
    var secret_path = crypto.randomBytes(16).toString('hex')
    return secret_path
  }
  render() {
    const containerStyle={
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 0,
      paddingRight: 0
    }

    var secret_path = "/"+process.env.REACT_APP_SECRET_ROUTE;
    //var secret_path = this.generateRoute()
    return (
      <Router>
        <Switch>
        
          <Route path={secret_path}>
            {!userSession.isUserSignedIn() ? <Signin /> : <HiddenPage />}
          </Route> 

          <Route path="/" exact component={CovertPage}>
            <CovertPage />
          </Route>

        </Switch>



      </Router>
                  
    )
    

  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => {
        window.history.replaceState({}, document.title, '/');
        this.setState({ userData: userData });
      });
    } else if (userSession.isUserSignedIn()) {
      this.setState({ userData: userSession.loadUserData() });
    }
  }
}
