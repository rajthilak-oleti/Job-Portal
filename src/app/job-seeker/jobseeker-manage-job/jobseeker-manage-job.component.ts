import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { HeaderService } from '../../services/header.service';
import { UpdateJobService } from '../../services/update-job.service';

@Component({
  selector: 'app-jobseeker-manage-job',
  templateUrl: './jobseeker-manage-job.component.html',
  styleUrls: ['./jobseeker-manage-job.component.scss']
})
export class JobseekerManageJobComponent implements OnInit {
  @ViewChild('jobApplyForm') jobApplyForm!: NgForm;
  jobApplyFormError = '';
  userDetails: any;
  jobDetailsToApply: any;
  activeUserInfo: any;
  headerData = {
    breadcrumbLinks: ['jobseeker', 'apply job'],
    profileName: '',
  }
  
  constructor(private router: Router, private updateJobService: UpdateJobService,
    private commonService: CommonService, private headerService: HeaderService) { }

  ngOnInit(): void {
    const activeUserInfo = JSON.parse(localStorage.getItem('activeUserInfo') || '{}');
    if(activeUserInfo) {
      this.userDetails = activeUserInfo.account;
      this.headerData.profileName = activeUserInfo.account.firstName;
      this.jobDetailsToApply = activeUserInfo.jobDetailsToApply;
    }
    this.headerService.updateHeaderLinks(this.headerData);
  }

  resetFormAndRedirect() {
    this.jobApplyForm.reset();
    this.router.navigateByUrl('jobseeker/jobs');
    this.removeApplyToJobFromActiveUserInfo();
  }

  applyJob() {
    let newApplicationValues = this.jobApplyForm.form.value;
    const appliedJobObj = this.buildAppliedJobObject(this.jobDetailsToApply);
    const newApplicationObj = {...appliedJobObj, ...newApplicationValues};

    // adding newApplicationObj in jobSeeker
    this.userDetails && this.userDetails.jobsApplied ? '' : this.userDetails['jobsApplied'] = [];
    this.userDetails['jobsApplied'].push(newApplicationObj);
    localStorage.setItem(this.userDetails['username'], JSON.stringify(this.userDetails));

    // Updating activeUserInfo
    const activeInfo = JSON.parse(localStorage.getItem('activeUserInfo') || '{}');
    activeInfo['account'] = this.userDetails
    localStorage.setItem('activeUserInfo', JSON.stringify(activeInfo));
    
    // adding newApplicationObj in employer
    let employerObj = JSON.parse(localStorage.getItem(newApplicationObj['postedBy']) || '{}');
    employerObj['jobApplicationsRecieved'] && employerObj['jobApplicationsRecieved'].length > 0 ? '' : 
      employerObj['jobApplicationsRecieved'] = [];
    employerObj['jobApplicationsRecieved'].push(newApplicationObj);

    employerObj['postedJobs'].forEach((jobObject: any) => {
      if(jobObject['jobTitle'] === newApplicationObj['jobTitle'] && 
        jobObject['company'] === newApplicationObj['company'] &&
         jobObject['postedBy'] === newApplicationObj['postedBy']) {
          jobObject['applicationsCount'] = jobObject['applicationsCount'] >=0  ?
           jobObject['applicationsCount'] + 1 : 0;
      }
    });
    localStorage.setItem(employerObj['username'], JSON.stringify(employerObj));


    // adding new Application in available Jobs
    const allJobs = JSON.parse(localStorage.getItem('availableJobs') || '{}');
    allJobs.forEach((jobObject: any) => {
      if(jobObject['jobTitle'] === newApplicationObj['jobTitle'] && 
        jobObject['postedBy'] === newApplicationObj['postedBy'] && 
        jobObject['company'] === newApplicationObj['company'] ) {
        jobObject['applicationsCount'] = jobObject['applicationsCount'] >=0  ?
             jobObject['applicationsCount'] + 1 : 0;
        jobObject['applications'] && jobObject['applications'].length > 0 ? '' : jobObject['applications'] = [];
        jobObject['applications'].push(newApplicationObj);
      }
    });
    localStorage.setItem('availableJobs', JSON.stringify(allJobs));
    this.removeApplyToJobFromActiveUserInfo();
    this.router.navigateByUrl('/jobseeker/jobs');
  }

  removeApplyToJobFromActiveUserInfo() {
    let activeInfo = JSON.parse(localStorage.getItem('activeUserInfo') || '{}');
    delete activeInfo.jobToApply;
  }

  buildAppliedJobObject(jobDetailsObject: any) {
    return {
      'jobTitle': jobDetailsObject['jobTitle'],
      'postedBy': jobDetailsObject['postedBy'],
      'company': jobDetailsObject['company'],
      'applicant': this.userDetails['username'],
      'appliedOn': new Date(),
      'jobDescription': jobDetailsObject['jobDescription'],
      'experienceInYears': jobDetailsObject['experienceInYears'],
      'experienceInMonths': jobDetailsObject['experienceInMonths'],
      'skills': jobDetailsObject['skills']
    }
  }

}
