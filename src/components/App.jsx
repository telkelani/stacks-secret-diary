import React, { Component } from 'react';
import {CovertGeo} from '../pages/covert_geo_components/CovertGeo'
import { Signin } from '../pages/hidden_page_components/Signin';
import { HiddenPage } from '../pages/hidden_page_components/HiddenPage';
import { userSession } from '../auth';
import { Route, BrowserRouter, Switch} from 'react-router-dom'

//Import necessary css modules like bootstrap and datepicker
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

//Secret path defined for secret page

export var secret_path = "/"+process.env.REACT_APP_SECRET_ROUTE;

export default class App extends Component {
  state = {
    userData: null //Store Blockstack user session
  };

  //Sign out user - deletes session and redirects to covert page
  handleSignOut(e) {
    e.preventDefault();
    this.setState({ userData: null });
    userSession.signUserOut(window.location.origin); 
  }


  render() {
    /**
     * Wrap routes in BrowserRouter to define routes
     * exact to match path string exactly the way it was written
     */
    return (
        
        <BrowserRouter>
       
          <Switch>
            <Route path={secret_path} exact > 
                  {/* If user is not signed in, render Signin component
                      if not, render hidden page component */}
                  {!userSession.isUserSignedIn() ? <Signin /> : <HiddenPage />}
              </Route>
              
              {/* Render CovertGeo on homepage */}
              <Route path="/" exact>
                  <CovertGeo />
              </Route>
              
          </Switch>
          
        </BrowserRouter>
                  
    )
    

  }
  /**
   * Defines what to do when application's DOM has rendered
   */
  componentDidMount() {
    //If user sign in hangs, then go to the secret page and set the userData
    //Otherwise if the user has successfully signed in, set the userData state user session data
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => { 
        window.location.replace(secret_path); //For this to work on mobile had to do this
        //Before it would go back to the home page when authenticated
        this.setState({ userData: userData });
      });
  
    } else if (userSession.isUserSignedIn()) {
      this.setState({ userData: userSession.loadUserData() });
    }
  }

}
