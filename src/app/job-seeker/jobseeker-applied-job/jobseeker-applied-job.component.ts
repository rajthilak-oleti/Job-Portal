import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-jobseeker-applied-job',
  templateUrl: './jobseeker-applied-job.component.html',
  styleUrls: ['./jobseeker-applied-job.component.scss']
})
export class JobseekerAppliedJobComponent implements OnInit {
  userDetails:any = {};
  jobsList: any;
  jobsNotFound = true;
  headerData = {
    breadcrumbLinks: ['jobseeker', 'applied jobs'],
    profileName: '',
  }
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns = ['title', 'description', 'skills', 'experience', 'appliedOn', 'cancel'];
  public dataSource = new MatTableDataSource<any>();

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    const activeUserInfo = JSON.parse(localStorage.getItem('activeUserInfo') || '{}');
    if(activeUserInfo) {
      this.userDetails = JSON.parse(localStorage.getItem(activeUserInfo.account.username) || '{}');
      this.headerData.profileName = activeUserInfo.account.firstName;
    }
    this.headerService.updateHeaderLinks(this.headerData);
    this.getAllJobs();
  }

  getAllJobs() {
    let activeInfo = JSON.parse(localStorage.getItem('activeUserInfo') || '{}');
    this.userDetails = JSON.parse(localStorage.getItem(activeInfo.account['username']) || '{}');
    if(this.userDetails['jobsApplied'] && this.userDetails['jobsApplied'].length > 0) {
      this.jobsList = this.userDetails['jobsApplied'];
      this.jobsNotFound = false;
    } else {
      this.jobsNotFound = true;
    }
    this.dataSource.data = this.jobsList;
  }
  
  doFilter = (value: any) => {
    this.dataSource.filter = value.target.value.trim().toLocaleLowerCase();
  }
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  cancelAppliedJob(jobDetailsToCancel: any) {
    const that = this;
    const availableJobs = JSON.parse(localStorage.getItem('availableJobs') || '[]');
    const targetEmployer = JSON.parse(localStorage.getItem(jobDetailsToCancel['postedBy']) || '{}');
    // remove from JobSeeker
    if(this.userDetails['jobsApplied'] && this.userDetails['jobsApplied'].length > 0) {
      let index = this.getTargetJobIndexInArray(this.userDetails['jobsApplied'], jobDetailsToCancel);
      if(index >= 0) {
        this.userDetails['jobsApplied'].splice(index, 1);
        localStorage.setItem(this.userDetails.username, JSON.stringify(this.userDetails));
      }
    }

    // Remove from Available Jobs
    if(availableJobs && availableJobs.length > 0) {
      let availableJobIndex = this.getTargetJobIndexInArray(availableJobs, jobDetailsToCancel);
      if(availableJobIndex >= 0) {
        let applicationsArray = availableJobs[availableJobIndex]['applications'];
        if(applicationsArray && applicationsArray.length > 0) {
          let applicationIndex = applicationsArray.findIndex((obj: any) => {
            return (obj['applicant'] === that.userDetails['username'] &&
            obj['jobTitle'] === jobDetailsToCancel['jobTitle'])
          });
          applicationsArray.splice(applicationIndex, 1)
          applicationsArray.length <= 0 ? delete availableJobs[availableJobIndex]['applications'] : '';
          localStorage.setItem('availableJobs', JSON.stringify(availableJobs));
        }
      }
    }

    // Remove from Employer
    const empApplicationsRecieved = targetEmployer['jobApplicationsRecieved'];
    if(empApplicationsRecieved && empApplicationsRecieved.length > 0) {
      let indexInEmpAppRecieved = this.getTargetJobIndexInArray(empApplicationsRecieved, jobDetailsToCancel);
      if(indexInEmpAppRecieved >= 0) {
        empApplicationsRecieved.splice(indexInEmpAppRecieved, 1);
        empApplicationsRecieved.length <= 0 ? empApplicationsRecieved.splice(indexInEmpAppRecieved, 1) : '';
        localStorage.setItem(targetEmployer['username'], JSON.stringify(targetEmployer));
      }

      
    }

    // Reduce count in application Count
    const jobsPostedByemployer = targetEmployer['postedJobs'];
    if(jobsPostedByemployer && jobsPostedByemployer.length > 0) {
      let indexInPostedJobs = this.getTargetJobIndexInArray(jobsPostedByemployer, jobDetailsToCancel);
      if(indexInPostedJobs >= 0) {
        if(jobsPostedByemployer[indexInPostedJobs]['applicationsCount'] > 0) {
          jobsPostedByemployer[indexInPostedJobs]['applicationsCount'] = jobsPostedByemployer[indexInPostedJobs]['applicationsCount'] - 1
        } else {
          jobsPostedByemployer[indexInPostedJobs]['applicationsCount'] = 0;
        }
        localStorage.setItem(targetEmployer['username'], JSON.stringify(targetEmployer));
      }
    }
    
    this.getAllJobs();
  }

  getTargetJobIndexInArray(arrayOfObjects: any[], targetObject: any) {
    let index = arrayOfObjects.findIndex((jobObject: any) => {
        return (jobObject.jobTitle === targetObject.jobTitle &&
          jobObject.postedBy === targetObject.postedBy && 
          jobObject.company === targetObject.company)
    });
    return index;
  }

}

