import React, { Component, useState } from 'react';
import {CovertGeo} from '../pages/covert_geo_components/CovertGeo'
import { Signin } from '../pages/hidden_page_components/Signin';
import { HiddenPage } from '../pages/hidden_page_components/HiddenPage';
import { userSession } from '../auth';
import { Route, Router, Switch} from 'react-router-dom'
import {MemoryRouter} from 'react-router'
import { createBrowserHistory} from 'history'
import {EntryProvider} from '../providers/EntryProvider'

import 'bootstrap/dist/css/bootstrap.min.css';
import "video-react/dist/video-react.css"; 
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

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
              
              <Route path="/" exact>
                  <CovertGeo />
              </Route>
              
          </Switch>
          
        </Router>

        </EntryProvider>
  

      
        
     
                  
    )
    

  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => { 
        window.location.replace(secret_path); //For this to work on mobile had to do this
        //Before it would go back to the home page when authenticate d
        this.setState({ userData: userData });
      });
    } else if (userSession.isUserSignedIn()) {
      this.setState({ userData: userSession.loadUserData() });
    }
  }

}
