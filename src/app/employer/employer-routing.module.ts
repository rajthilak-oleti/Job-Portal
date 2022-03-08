import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerAccessGuard } from '../guards/employer-access.guard';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { EmployerJobsComponent } from './employer-jobs/employer-jobs.component';
import { EmployerLoginComponent } from './employer-login/employer-login.component';
import { EmployerManageJobComponent } from './employer-manage-job/employer-manage-job.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { EmployerRegistrationComponent } from './employer-registration/employer-registration.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: EmployerLoginComponent },
  { path: 'register', component: EmployerRegistrationComponent },
  { path: 'dashboard', component: EmployerDashboardComponent, canActivate: [EmployerAccessGuard] },
  { path: 'editProfile', component: EmployerProfileComponent, canActivate: [EmployerAccessGuard] },
  { path: 'jobs', component: EmployerJobsComponent, canActivate: [EmployerAccessGuard] },
  { path: 'jobs/manageJob', component: EmployerManageJobComponent, canActivate: [EmployerAccessGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
