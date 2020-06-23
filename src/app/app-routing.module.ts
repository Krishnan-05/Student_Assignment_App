import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'assignment-list',
    loadChildren: () => import('./assignment-list/assignment-list.module').then( m => m.AssignmentListPageModule)
  },
  {
    path: 'submission',
    loadChildren: () => import('./submission/submission.module').then( m => m.SubmissionPageModule)
  },
  {
    path: 'subjectlist',
    loadChildren: () => import('./subjectlist/subjectlist.module').then( m => m.SubjectlistPageModule)
  },  {
    path: 'add-assignment',
    loadChildren: () => import('./add-assignment/add-assignment.module').then( m => m.AddAssignmentPageModule)
  },
  {
    path: 'submissionreport',
    loadChildren: () => import('./submissionreport/submissionreport.module').then( m => m.SubmissionreportPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
