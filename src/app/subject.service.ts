import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class SubjectService {
  currentSubject: string;
  subject: any;
  assignmentID: string;
  userType: string;
  constructor() {}

  setUserType(userType) {
    this.userType = userType;
  }
  getUserType() {
    return this.userType;
  }

  setSubject(subject: string) {
    this.currentSubject = subject;
  }
  getSubject() {
    return this.currentSubject;
  }
  setSubjectObject(subjectObject) {
    this.subject = subjectObject;
  }
  getSubjectObject() {
    return this.subject;
  }
  setAssignmentID(assignmentID) {
    this.assignmentID = assignmentID;
  }
  getAssignmentID() {
    return this.assignmentID;
  }
}
