import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInRole = '';

  constructor() { }

  logout() {
    const activeUserdetails = JSON.parse(localStorage.getItem('activeUserInfo') || '{}');
    if(activeUserdetails && activeUserdetails['account']) {
      let userDetails = JSON.parse(localStorage.getItem(activeUserdetails['account']['username']) || '{}');
      userDetails['isLoggedIn'] = false;
      localStorage.setItem(userDetails['username'], JSON.stringify(userDetails));
      localStorage.removeItem('activeUserInfo');
    }
  }

  getAuthenticatedRole(): any {
    const activeUserdetails = JSON.parse(localStorage.getItem('activeUserInfo') || '{}');
    if(activeUserdetails && activeUserdetails['account']) {
      const currentRole = activeUserdetails['account']['role'];
      return currentRole;
    } else {
      return '';
    }
  }
}
