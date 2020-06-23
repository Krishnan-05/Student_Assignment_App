import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmissionreportPageRoutingModule } from './submissionreport-routing.module';

import { SubmissionreportPage } from './submissionreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmissionreportPageRoutingModule
  ],
  declarations: [SubmissionreportPage]
})
export class SubmissionreportPageModule {}
