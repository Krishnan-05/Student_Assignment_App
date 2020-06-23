import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { SubjectService } from "../subject.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-add-assignment",
  templateUrl: "./add-assignment.page.html",
  styleUrls: ["./add-assignment.page.scss"],
})
export class AddAssignmentPage implements OnInit {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;

  constructor(
    private db: AngularFirestore,
    private subject: SubjectService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
    return loading.present();
  }

  async addAssignment() {
    this.presentLoading();
    await this.db
      .collection("subjects")
      .doc("subjects")
      .collection(this.subject.getSubject())
      .add({
        title: this.title,
        description: this.description,
        startDate: this.startDate,
        endDate: this.endDate,
        submittedStudents: [],
      });
    this.loadingController.dismiss();
    this.router.navigate(["subjectlist"]);
  }
  closePage() {
    this.router.navigate(["subjectlist"]);
  }
}
