import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from "../pages/login/login";
import authStore from './auth-state'

import "rxjs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

    });


  }

  ngOnInit() {
    // check to see if there is already a user... Ionic saves it for you,
    // this will automatically log the user in when you restart the application

    authStore.initialize().then(()=> {
      this.rootPage = authStore.currentUser ? TabsPage : LoginPage
    })

  }
}
