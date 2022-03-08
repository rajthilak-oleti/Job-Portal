import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobseekerAccessGuard } from '../guards/jobseeker-access.guard';
import { JobSeekerComponent } from './job-seeker.component';
import { JobseekerAppliedJobComponent } from './jobseeker-applied-job/jobseeker-applied-job.component';
import { JobseekerJobsComponent } from './jobseeker-jobs/jobseeker-jobs.component';
import { JobseekerLoginComponent } from './jobseeker-login/jobseeker-login.component';
import { JobseekerManageJobComponent } from './jobseeker-manage-job/jobseeker-manage-job.component';
import { JobseekerRegisterComponent } from './jobseeker-register/jobseeker-register.component';

const routes: Routes = [
  { path: '', component: JobSeekerComponent },
  { path: 'login', component: JobseekerLoginComponent },
  { path: 'register', component: JobseekerRegisterComponent },
  { path: 'jobs', component: JobseekerJobsComponent, canActivate: [JobseekerAccessGuard] },
  { path: 'jobs/manageJob', component: JobseekerManageJobComponent, canActivate: [JobseekerAccessGuard] },
  { path: 'appliedJobs', component: JobseekerAppliedJobComponent, canActivate: [JobseekerAccessGuard] },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobSeekerRoutingModule { }
