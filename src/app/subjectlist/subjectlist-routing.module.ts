import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectlistPage } from './subjectlist.page';

const routes: Routes = [
  {
    path: '',
    component: SubjectlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectlistPageRoutingModule {}
