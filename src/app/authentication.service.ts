import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { toBase64String } from "@angular/compiler/src/output/source_map";
import { SubjectService } from "./subject.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(
    private firebaseAuthentication: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private service: SubjectService
  ) {}

  async signup(email: string, password: string, username: string) {
    try {
      const response = await this.firebaseAuthentication.createUserWithEmailAndPassword(
        email.trim(),
        password.trim()
      );
      await response.user.updateProfile({
        displayName: username,
        photoURL: "student",
      });

      await this.db.collection("users").doc(response.user.uid).set({
        id: response.user.uid,
        username: response.user.displayName,
        email: response.user.email,
        userType: "student",
      });
      this.router.navigate(["home"]);
    } catch (error) {
      throw error;
    }
  }
  async login(email: string, password: string) {
    try {
      const response = await this.firebaseAuthentication.signInWithEmailAndPassword(
        email,
        password
      );
      if (response === null) {
        return response;
      } else {
        this.router.navigate(["subjectlist"]);
        return response;
      }
    } catch (err) {
      return err;
    }
  }
}
