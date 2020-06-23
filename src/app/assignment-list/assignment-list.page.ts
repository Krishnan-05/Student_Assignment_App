import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { SubjectService } from "../subject.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-assignment-list",
  templateUrl: "./assignment-list.page.html",
  styleUrls: ["./assignment-list.page.scss"],
})
export class AssignmentListPage implements OnInit {
  isStudent = false;
  isStaff = false;
  assignments = [];
  assignmentIDList = [];
  pendingAssignments = [];
  submittedAssignments = [];
  constructor(
    private router: Router,
    private db: AngularFirestore,
    private subject: SubjectService,
    private auth: AngularFireAuth
  ) {
    this.setUserType();
  }

  async setUserType() {
    const user = await this.auth.currentUser;
    this.isStudent = user.photoURL === "student";
    this.isStaff = user.photoURL === "staff";
  }

  async ngOnInit() {
    const user = await this.auth.currentUser;
    const response = await this.db
      .collection("subjects")
      .doc("subjects")
      .collection(this.subject.getSubject())
      .ref.get()
      .then((data) => {
        data.docs.forEach((datum) => {
          this.assignmentIDList.push(datum.id);
          this.assignments.push(datum.data());
        });
      })
      .then(() => {
        this.assignments.forEach((assignment) => {
          let isFound = assignment.submittedStudents.filter(
            (student) => student.id === user.uid
          );
          if (isFound.length >= 1 && assignment !== undefined) {
            console.log("Is Found", isFound);
            this.submittedAssignments.push(assignment);
          } else {
            this.pendingAssignments.push(assignment);
          }
        });
      });
  }

  addAssignment() {
    this.router.navigate(["add-assignment"]);
  }
  submitAssignment(assignment) {
    const index = this.assignments.findIndex(
      (totalAssignment) =>
        totalAssignment.title === assignment.title &&
        totalAssignment.description === assignment.description
    );

    this.subject.setAssignmentID(this.assignmentIDList[index]);
    this.subject.setSubjectObject(assignment);
    this.router.navigate(["submission"]);
  }
  gotoReport(assignment, index) {
    this.subject.setAssignmentID(this.assignmentIDList[index]);
    this.subject.setSubjectObject(assignment);
    this.router.navigate(["submissionreport"]);
  }
}
