import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateJobService } from 'src/app/services/update-job.service';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-employer-manage-job',
  templateUrl: './employer-manage-job.component.html',
  styleUrls: ['./employer-manage-job.component.scss']
})
export class EmployerManageJobComponent implements OnInit {
  userDetails: any;
  @ViewChild('jobManageForm') jobManageForm!: NgForm;
  jobManageFormError = '';

  headerData = {
    breadcrumbLinks: ['employer', 'jobs', 'manage job'],
    profileName: '',
  }
  jobOperationToPerform = '';
  defaultJobValues: any;

  constructor(private router: Router, private headerService: HeaderService, 
    private updateJobService: UpdateJobService) {}

  ngOnInit(): void {
    const activeUserInfo = JSON.parse(localStorage.getItem('activeUserInfo') || '{}');
    if(activeUserInfo) {
      this.userDetails = JSON.parse(localStorage.getItem(activeUserInfo.account['username']) || '{}');
      this.headerData.profileName = activeUserInfo.account.firstName;
      this.jobOperationToPerform = activeUserInfo['operationToPerformOnJob'] ? 
      activeUserInfo['operationToPerformOnJob'] : ''
    }
    this.headerService.updateHeaderLinks(this.headerData);
    if(this.jobOperationToPerform === 'create') {
      this.defaultJobValues = this.getDefaultValuesForNewJob();
    }
    if(this.jobOperationToPerform === 'edit') {
      activeUserInfo['jobToEdit'] ? this.defaultJobValues = activeUserInfo['jobToEdit'] : '';
    }
  }

  manageJob() {
    let prevValues = this.userDetails
    let updatedValues = this.jobManageForm.form.value;
    if(this.jobOperationToPerform === 'create') {
      updatedValues['company'] = prevValues.company;
      updatedValues['postedBy'] = prevValues.username;
      updatedValues['applicationsCount'] = 0;
    }
    this.updateJobsInStore(updatedValues, this.jobOperationToPerform);
    this.updatePostedJobInEmployerObject(prevValues, updatedValues, this.jobOperationToPerform);
    this.jobManageForm.reset();
    this.router.navigateByUrl('/employer/jobs');
    this.updateJobService.manageJobOperationInActiveUserInfo('remove', 'create');
  }

  updatePostedJobInEmployerObject(prevValues: any, updatedValues: any, jobOperationToPerform: string) {
    if(jobOperationToPerform === 'create') {
      prevValues['postedJobs'] && prevValues['postedJobs'].length > 0 ? '' : prevValues['postedJobs'] = [];
      prevValues['postedJobs'].push(updatedValues);
      localStorage.setItem(prevValues.username, JSON.stringify(prevValues));
    }
    if(jobOperationToPerform === 'edit') {
      const that = this;
      if(prevValues['postedJobs'] && prevValues['postedJobs'].length > 0) {
        let index = prevValues['postedJobs'].findIndex((jobObject: any) => {
          return (jobObject.jobTitle === that.defaultJobValues.jobTitle &&
            jobObject.postedBy === that.defaultJobValues.postedBy && 
            jobObject.company === that.defaultJobValues.company)
        })
        if(index >= 0) {
          const result = { ...prevValues['postedJobs'][index], ...updatedValues}
          prevValues['postedJobs'][index] = result;
          localStorage.setItem(prevValues.username, JSON.stringify(prevValues));
        }
      }
    }

  }

  updateJobsInStore(updatedValues: any, jobOperationToPerform: string) {
    const that = this;
    const availableJobs = JSON.parse(localStorage.getItem('availableJobs') || '[]');
    if(jobOperationToPerform === 'create') {
      let jobsInStore = availableJobs ? availableJobs : [];
      jobsInStore.push(updatedValues)
      localStorage.setItem('availableJobs', JSON.stringify(jobsInStore));
    }
    if(jobOperationToPerform === 'edit') {
      if(availableJobs && availableJobs.length > 0) {
        let index = availableJobs.findIndex((jobObject: any) => {
          return (jobObject.jobTitle === that.defaultJobValues.jobTitle && 
              jobObject.postedBy === that.defaultJobValues.postedBy && 
              jobObject.company === that.defaultJobValues.company)
        })
        if(index >= 0) {
          const result = { ...availableJobs[index], ...updatedValues}
          availableJobs[index] = result;
          localStorage.setItem('availableJobs', JSON.stringify(availableJobs));
        }
      }
    }

  }

  resetFormAndRedirect() {
    this.jobManageForm.reset();
    this.router.navigate(['/employer/jobs']);
    this.updateJobService.manageJobOperationInActiveUserInfo('remove', 'create');
  }

  getDefaultValuesForNewJob() {
    return {
      'jobTitle': '','jobDescription': '', 'skills': [], 'experienceInYears': null, 'experienceInMonths': 0
    }
  }

}
