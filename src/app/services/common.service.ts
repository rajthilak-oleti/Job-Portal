import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  jobToApply: Subject<any> = new BehaviorSubject<any>(null);
  
  constructor() { }


  updateActiveUserInfo(propTypeToUpdate: string, username: string) {
    const activeUserInfo = JSON.parse(localStorage.getItem('activeUserInfo') || '{}');
    const targetUserDetails = JSON.parse(localStorage.getItem(username) || '{}');
    if(propTypeToUpdate === 'account') {
      activeUserInfo.account = targetUserDetails;
    }
    localStorage.setItem('activeUserInfo', JSON.stringify(activeUserInfo));

  }

  applyJob(jobToApply: any) {
    this.jobToApply.next(jobToApply)
  }

}
