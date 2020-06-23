import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { ToastController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  email: string;
  password: string;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    public toastController: ToastController,
    private loadingController: LoadingController
  ) {}
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "danger",
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
  async login() {
    this.presentLoading();
    const response = await this.authService.login(this.email, this.password);
    if (response.code != null) {
      this.loadingController.dismiss();
      this.presentToast(response.message);
      console.log(response);
    } else if (response !== null) {
      this.loadingController.dismiss();
    }
  }

  async gotoReg() {
    await this.router.navigate(["register"], { replaceUrl: true });
  }
}
