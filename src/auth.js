import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { Person } from '@stacks/profile';

const appConfig = new AppConfig(['store_write']); //Permissions that this app asks from user's Blockstack account

export const userSession = new UserSession({ appConfig }); //userSession from Blockstack

export function authenticate() {
  //showConnect() pops up the Blockstack login modal 
  showConnect({
    appDetails: {
      name: 'CapitalTrivia',
      icon: window.location.origin + '/geologo.png',
    },
    redirectTo: '/',
    finished: () => {
      window.location.reload();
    },
    userSession: userSession, //Creates userSession
  });
}

export function getUserData() {
  return userSession.loadUserData(); //Load relevant user data from Blockstack
}

export function getPerson() {
  return new Person(getUserData().profile);
}
