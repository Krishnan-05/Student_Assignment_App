import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../authentication.service'
import { ToastController, LoadingController } from '@ionic/angular'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  constructor (
    private router: Router,
    public authService: AuthenticationService,
    public toastController: ToastController,
    private loadingController: LoadingController
  ) {}
  username: string
  email: string
  password: string
  confirmpassword: string
  ngOnInit () {}
  async presentToast (msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger'
    })
    toast.present()
  }
  async presentLoading () {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...'
    })
    return loading.present()
  }

  async submit () {
    this.presentLoading()
    if (
      this.username !== undefined &&
      this.password !== undefined &&
      this.confirmpassword !== undefined &&
      this.email !== undefined
    ) {
      if (!this.email.includes('@')) {
        this.loadingController.dismiss()
        this.presentToast('Enter valid E-mail Address')
      } else if (this.password.length < 6) {
        this.loadingController.dismiss()
        this.presentToast('Password should be atleast 6 characters or more')
      } else if (this.password !== this.confirmpassword) {
        this.loadingController.dismiss()
        this.presentToast('Both passwords should be same')
      } else {
        try {
          const response = await this.authService.signup(
            this.email,
            this.password,
            this.username
          )
          this.loadingController.dismiss()
          console.log(response)
        } catch (error) {
          this.loadingController.dismiss()
          this.presentToast(error.message)
        }
      }
    } else {
      this.loadingController.dismiss()
      this.presentToast('Fields cannot be empty')
    }
    // console.log('username: ' + this.username)
    // console.log('email id: ' + this.email)
    // console.log('password: ' + this.password)
    // console.log('confirm password: ' + this.confirmpassword)
    // this.router.navigate(['home'])
  }
}
