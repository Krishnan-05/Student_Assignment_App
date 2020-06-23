import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubmissionreportPage } from './submissionreport.page';

const routes: Routes = [
  {
    path: '',
    component: SubmissionreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmissionreportPageRoutingModule {}
