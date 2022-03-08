import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateJobService {

  constructor() { }

  updateNewJobForOtherRoles(roleToUpdate: any,  jobDetails: any, userDetails: any) {
    if(roleToUpdate === 'employer') {
      const employerObject = JSON.parse(localStorage.getItem(jobDetails.postedBy) || '{}');
      const allJobs = JSON.parse(localStorage.getItem('availableJobs') || '{}');
      if(employerObject) {
        employerObject['jobApplicationsRecieved'] && employerObject['jobApplicationsRecieved'].length > 0 ?
        '' : employerObject['jobApplicationsRecieved'] = [];
        employerObject['jobApplicationsRecieved'].push(jobDetails);
        employerObject['postedJobs'].forEach((jobObject: any) => {
          if(jobObject['jobTitle'] === jobDetails['jobTitle'] && jobObject['company'] === jobDetails['company']
            && jobObject['jobSkills'] === jobDetails['jobSkills']) {
              jobObject['applicationsCount'] = jobObject['applicationsCount'] >=0  ?
               jobObject['applicationsCount'] + 1 : 0;
          }
        });
        const updatedEmployerObj = { ...employerObject };
        localStorage.setItem(employerObject['username'], JSON.stringify(updatedEmployerObj));
      }

      allJobs.forEach((jobObject: any) => {
        if(jobObject['jobTitle'] === jobDetails['jobTitle'] && jobObject['postedBy'] === jobDetails['postedBy']) {
          jobObject['applicationsCount'] = jobObject['applicationsCount'] >=0  ?
               jobObject['applicationsCount'] + 1 : 0;
          jobObject['applications'] && jobObject['applications'].length > 0 ? '' : jobObject['applications'] = [];
          jobObject['applications'] = jobDetails['applications'];
        }
      });
      const updatedJobs = JSON.parse(JSON.stringify(allJobs))
      localStorage.setItem('availableJobs', JSON.stringify(updatedJobs));
    }


  }

  manageJobOperationInActiveUserInfo(type:string, operationToPerformOnJob: string, propertyName?: string, propertyValue?: any) {
    let activeUserInfo = JSON.parse(localStorage.getItem('activeUserInfo') || '{}');
    if(type === 'add') {
      propertyName && propertyValue ? activeUserInfo[propertyName] = propertyValue : '';
      operationToPerformOnJob ? activeUserInfo['operationToPerformOnJob'] = operationToPerformOnJob : '';
    }
    if(type === 'remove') {
      activeUserInfo['jobToEdit'] ? delete activeUserInfo['jobToEdit'] : '';
    }
    localStorage.setItem('activeUserInfo', JSON.stringify(activeUserInfo));
  }

}
