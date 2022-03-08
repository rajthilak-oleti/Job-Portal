import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { EmployerLoginComponent } from './employer-login/employer-login.component';
import { FormsModule } from '@angular/forms';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { EmployerRegistrationComponent } from './employer-registration/employer-registration.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { EmployerJobsComponent } from './employer-jobs/employer-jobs.component';
import { EmployerManageJobComponent } from './employer-manage-job/employer-manage-job.component';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EmployerComponent,
    EmployerLoginComponent,
    EmployerDashboardComponent,
    EmployerRegistrationComponent,
    EmployerProfileComponent,
    EmployerJobsComponent,
    EmployerManageJobComponent,
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ]
})
export class EmployerModule { }
