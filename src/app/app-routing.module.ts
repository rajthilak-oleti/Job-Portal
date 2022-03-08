import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate  } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'employer', 
    loadChildren: () => import('./employer/employer.module').then(m => m.EmployerModule),
  }, 
  { path: 'jobseeker', 
    loadChildren: () => import('./job-seeker/job-seeker.module').then(m => m.JobSeekerModule),
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
