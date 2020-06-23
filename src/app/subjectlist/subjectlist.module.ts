import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubjectlistPageRoutingModule } from './subjectlist-routing.module';

import { SubjectlistPage } from './subjectlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubjectlistPageRoutingModule
  ],
  declarations: [SubjectlistPage]
})
export class SubjectlistPageModule {}
