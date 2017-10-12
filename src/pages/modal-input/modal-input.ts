import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the ModalInputPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-input',
  templateUrl: 'modal-input.html',
})
export class ModalInputPage {
  thingInputForm

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {

    this.thingInputForm = new FormGroup({
      name: new FormControl('', Validators.required),
      project: new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalInputPage');
  }

  dismiss() {
    let data = {cancelled: true};
    this.viewCtrl.dismiss(data);
  }

  saveAndDismiss() {
    let data = {
      cancelled: false,
      thing: this.thingInputForm.value
    };
    this.viewCtrl.dismiss(data);
  }
}
