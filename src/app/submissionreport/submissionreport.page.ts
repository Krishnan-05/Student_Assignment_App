import { Component, OnInit } from '@angular/core'
import { SubjectService } from '../subject.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-submissionreport',
  templateUrl: './submissionreport.page.html',
  styleUrls: ['./submissionreport.page.scss']
})
export class SubmissionreportPage implements OnInit {
  subjectReport: any
  isEmpty: boolean = true
  constructor (private subject: SubjectService) {}

  ngOnInit () {
    this.subjectReport = this.subject.getSubjectObject()
    if ("submittedStudents" in this.subjectReport) {
      if (this.subjectReport.submittedStudents[0] !== "") {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }
  }
}}
