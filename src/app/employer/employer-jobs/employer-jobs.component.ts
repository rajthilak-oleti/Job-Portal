import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HeaderService } from '../../services/header.service';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { UpdateJobService } from 'src/app/services/update-job.service';

@Component({
  selector: 'app-employer-jobs',
  templateUrl: './employer-jobs.component.html',
  styleUrls: ['./employer-jobs.component.scss']
})
export class EmployerJobsComponent implements OnInit {
  jobsList: any;
  jobsNotFound = true;
  userDetails: any;
  headerData = {
    breadcrumbLinks: ['employer', 'jobs', 'created jobs'],
    profileName: '',
  };

  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns = ['title', 'description', 'skills', 'experience', 'applicationsCount', 'edit'];
  public dataSource = new MatTableDataSource<any>();

  constructor(private headerService: HeaderService, private updateJobService: UpdateJobService,
    private router: Router) { }

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
      this.userDetails = JSON.parse(localStorage.getItem(activeUserInfo.account.username) || '{}');
      if(this.userDetails && this.userDetails.postedJobs) {
        this.jobsList = this.userDetails.postedJobs;
        this.jobsNotFound = false;
      } else {
        this.jobsNotFound = true;
        this.jobsList = [];
      }
    }
    this.dataSource.data = this.jobsList;
  }

  doFilter = (value: any) => {
    this.dataSource.filter = value.target.value.trim().toLocaleLowerCase();
  }

  createNewJob() {
    this.updateJobService.manageJobOperationInActiveUserInfo('add','create');
    this.router.navigateByUrl('/employer/jobs/manageJob');
  }

  editJob(jobToEdit: any) {
    this.updateJobService.manageJobOperationInActiveUserInfo('add', 'edit', 'jobToEdit', jobToEdit);
    this.router.navigateByUrl('/employer/jobs/manageJob');
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

}
