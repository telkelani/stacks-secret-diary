import React, { Component, useState } from 'react';
import { CovertPage } from '../pages/covert_components/Covert'
import { Signin } from '../pages/Signin';
import { HiddenPage } from '../pages/HiddenPage';
import { userSession } from '../auth';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import { v4 as uuid } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import {EntryProvider} from '../providers/EntryProvider'
export var secret_path = "/"+process.env.REACT_APP_SECRET_ROUTE;

export default class App extends Component {
  state = {
    userData: null
  };

  handleSignOut(e) {
    e.preventDefault();
    this.setState({ userData: null });
    userSession.signUserOut(window.location.origin);
  }

  render() {
    const containerStyle={
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 0,
      paddingRight: 0
    }

    
    //var secret_path = this.generateRoute()
    return (
      //Put the provider in the app so that ALL components have access to Entry state

        <EntryProvider>


        <Router>
          <Switch>
              <Route path={secret_path} exact >
                {!userSession.isUserSignedIn() ? <Signin /> : <HiddenPage />}
              </Route> 
              <Route path="/" exact component={CovertPage} />
          </Switch>
        </Router>

        </EntryProvider>
  

      
        
     
                  
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
