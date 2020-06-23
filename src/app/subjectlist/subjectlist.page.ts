import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SubjectService } from "../subject.service";
import { MenuController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-subjectlist",
  templateUrl: "./subjectlist.page.html",
  styleUrls: ["./subjectlist.page.scss"],
})
export class SubjectlistPage implements OnInit {
  constructor(
    private router: Router,
    private subject: SubjectService,
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {}
  signout() {
    this.auth.signOut().then(() => {
      this.router.navigate(["/"]);
    });
  }
  changeRouter(subject: string) {
    this.subject.setSubject(subject);
    this.router.navigate(["assignment-list"]);
  }
}
