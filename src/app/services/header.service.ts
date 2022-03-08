import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  headerData: Subject<any> = new BehaviorSubject<any>(null);

  linksObject = {
    employer : [
      {'label': 'dashboard', 'url': '/employer/dashboard'},
      {'label': 'profile', 'url': '/employer/editProfile'},
      {'label': 'Jobs', 'url': '/employer/jobs'},
      {'label': 'logout', 'url': '', 'clickEventRequired': true}
    ],
    jobseeker : [
      {'label': 'jobs', 'url': '/jobseeker/jobs'},
      {'label': 'applied jobs', 'url': '/jobseeker/appliedJobs'},
      {'label': 'logout', 'url': '', 'clickEventRequired': true}
    ],
  }

  constructor() { }

  updateHeaderLinks(headerDataObject: any) {
    this.headerData.next(headerDataObject)
  }

  initializeHeaderLinks() {
    const activeUserInfo = JSON.parse(localStorage.getItem('activeUserInfo') || '{}');
    if(activeUserInfo && activeUserInfo['role']) {
      const userRole = activeUserInfo['role'];
      let dataToHeader = {
        'headerLinks':  userRole === 'employer' ? this.linksObject['employer'] : this.linksObject['jobseeker'],
      }
      this.updateHeaderLinks(dataToHeader);
    }
  }
  
}
