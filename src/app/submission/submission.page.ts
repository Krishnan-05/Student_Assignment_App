import { Component, OnInit } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { LoadingController } from "@ionic/angular";
import { SubjectService } from "../subject.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-submission",
  templateUrl: "./submission.page.html",
  styleUrls: ["./submission.page.scss"],
})
export class SubmissionPage implements OnInit {
  files: File;
  subjectReport: any;
  constructor(
    public alertController: AlertController,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private subject: SubjectService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subjectReport = this.subject.getSubjectObject();
    if (this.subjectReport.submittedStudents === undefined) {
      this.subjectReport.submittedStudents = [];
    }
  }
  async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
    return loading.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Hand in your work?",
      message: "1 attachment will be added",
      buttons: [
        {
          text: "cancel",
          handler: () => {},
        },

        {
          text: "Okay",
          handler: async () => {
            await this.presentLoading();
            try {
              const fileName = this.files.name;
              const user = await this.auth.currentUser;
              const dbRef = await this.db
                .collection("subjects")
                .doc("subjects")
                .collection(this.subject.getSubject()).ref;
              // firebase storage
              await this.storage
                .ref(user.uid) // create folder
                .child(fileName) // blank file with given name
                .put(this.files, {
                  //  add data into blank file
                  contentType: "applicaton/msword",
                });
              this.subjectReport.submittedStudents.push({
                name: user.displayName,
                id: user.uid,
                date: Date().toLocaleString(),
                fileURL: await this.storage
                  .ref(user.uid)
                  .child(fileName)
                  .getDownloadURL()
                  .toPromise(),
              }); // firebase cloud database
              await dbRef.doc(this.subject.getAssignmentID()).set(
                {
                  ...this.subjectReport,
                },
                { merge: true }
              );
              this.loadingController.dismiss();
              this.presentToast("File Added Successfully", "success");
              this.router.navigate(["/subjectlist"]);
             
            } catch (error) {
              this.loadingController.dismiss();
              this.presentToast(
                "Failed to upload! Please try again later.",
                "danger"
              );
            }
          },
        },
      ],
    });

    await alert.present();
  }
  async handin() {
    await this.presentAlert();
   
  }
  uploadfile(ev) {
    this.files = ev.target.files[0];
   
  }
}
