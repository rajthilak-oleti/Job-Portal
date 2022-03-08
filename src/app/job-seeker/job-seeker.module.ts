import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobSeekerRoutingModule } from './job-seeker-routing.module';
import { JobSeekerComponent } from './job-seeker.component';
import { JobseekerLoginComponent } from './jobseeker-login/jobseeker-login.component';
import { JobseekerRegisterComponent } from './jobseeker-register/jobseeker-register.component';
import { JobseekerProfileComponent } from './jobseeker-profile/jobseeker-profile.component';
import { JobseekerJobsComponent } from './jobseeker-jobs/jobseeker-jobs.component';
import { FormsModule } from '@angular/forms';
import { JobseekerManageJobComponent } from './jobseeker-manage-job/jobseeker-manage-job.component';
import { JobseekerAppliedJobComponent } from './jobseeker-applied-job/jobseeker-applied-job.component';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    JobSeekerComponent,
    JobseekerLoginComponent,
    JobseekerRegisterComponent,
    JobseekerProfileComponent,
    JobseekerJobsComponent,
    JobseekerManageJobComponent,
    JobseekerAppliedJobComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    JobSeekerRoutingModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,

    SharedModule,
  ]
})
export class JobSeekerModule { }
