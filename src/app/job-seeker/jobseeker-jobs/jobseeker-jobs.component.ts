import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-jobseeker-jobs',
  templateUrl: './jobseeker-jobs.component.html',
  styleUrls: ['./jobseeker-jobs.component.scss']
})
export class JobseekerJobsComponent implements OnInit {
  userDetails:any = {};
  jobsList: any;
  jobsNotFound = true;
  appliedJobs: any;
  headerData = {
    breadcrumbLinks: ['jobseeker', 'available jobs'],
    profileName: '',
  }
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns = ['title', 'description', 'skills', 'experience', 'apply'];
  public dataSource = new MatTableDataSource<any>();

  constructor(private router: Router, private commonService: CommonService, 
    private headerService: HeaderService) { }

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
    const activeUserInfo = JSON.parse(localStorage.getItem('activeUserInfo') || '{}');
    if(activeUserInfo) {
      this.userDetails = activeUserInfo.account;
    }
    const allJobs = JSON.parse(localStorage.getItem('availableJobs') || '{}');
    if(allJobs && allJobs.length > 0) {
      this.jobsNotFound = false;
      // show Only Jobs which are not applied by loggedIn user (Job Applicant).
      this.jobsList = this.filterNotAppliedJobs(allJobs);
      this.jobsNotFound = this.jobsList && this.jobsList.length > 0 ? false : true;  
    } else {
      this.jobsNotFound = true;
      this.jobsList = [];
    }
    this.dataSource.data = this.jobsList;
  }

  filterNotAppliedJobs(allJobs: any) {
    // check if loggedin jobseeker already applied to this job
    let availableJobs: any[] = [];
    let that = this;
    allJobs.forEach((jobObject: any) => {
      if(jobObject['applications'] && jobObject['applications'].length > 0) {
        let index = jobObject['applications'].findIndex((jobApplication: any) => {
          return (jobApplication['applicant'] === that.userDetails['username'])
        });
        index < 0 ?  availableJobs.push(jobObject) : '';
      } else {
        availableJobs.push(jobObject);
      }
    });
    return availableJobs;
  }

  applyJob(jobDetails: any) {
    let activeUserInfo = JSON.parse(localStorage.getItem('activeUserInfo') || '{}');
    activeUserInfo['jobDetailsToApply'] = jobDetails;
    localStorage.setItem('activeUserInfo', JSON.stringify(activeUserInfo));
    this.router.navigateByUrl('/jobseeker/jobs/manageJob');
  }

  doFilter = (value: any) => {
    this.dataSource.filter = value.target.value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
