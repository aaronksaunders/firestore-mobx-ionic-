import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import authStore from "../../app/auth-state";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }

  logout() {
    authStore.logout()
    this.navCtrl.setRoot(LoginPage)
  }

}
