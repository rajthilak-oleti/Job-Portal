import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-employer-dashboard',
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.scss']
})
export class EmployerDashboardComponent implements OnInit {

  userDetails:any = {};
  jobs = {
    jobsCreated : 0,
    jobApplicationsRecieved: 0,
  }
  headerData = {
    breadcrumbLinks: ['employer', 'dashboard'],
    profileName: '',
  }

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {

    const activeUserInfo = JSON.parse(localStorage.getItem('activeUserInfo') || '{}');
    if(activeUserInfo) {
      this.userDetails = JSON.parse(localStorage.getItem(activeUserInfo.account.username) || '{}');
      this.headerData.profileName = activeUserInfo.account.firstName;
      this.jobs.jobsCreated = this.userDetails.postedJobs ? this.userDetails.postedJobs.length : 0;
      this.jobs.jobApplicationsRecieved = this.userDetails.jobApplicationsRecieved ?
        this.userDetails.jobApplicationsRecieved.length : 0;
    }
    this.headerService.updateHeaderLinks(this.headerData);
  }

}
