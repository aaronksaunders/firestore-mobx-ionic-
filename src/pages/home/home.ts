import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ModalController, NavController, ToastController} from 'ionic-angular';

// services
import thingStore from '../../app/thing-state'

// pages
import {ModalInputPage} from "../modal-input/modal-input";

// vendor
import {Observable} from 'rxjs'


@Component({
  selector: 'page-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'home.html'
})
export class HomePage {
  items: Observable<[any]>
  thingStore = null

  constructor(public navCtrl: NavController,
              private toastCtrl: ToastController,
              public modalCtrl: ModalController) {

    this.thingStore = thingStore
  }

  /**
   *
   * @param _item
   */
  deleteItem(_item) {

    thingStore.removeThing(_item)
      .then(() => {
        this._quickToast('Thing was deleted successfully' );
      })

  }

  /**
   *
   */
  newThing() {
    let modal = this.modalCtrl.create(ModalInputPage);

    modal.onDidDismiss((data, role) => {

      if (!data.cancelled) {
        thingStore.addThing({...data.thing, when: new Date().getTime()})
          .then(() => {
            this._quickToast('Thing was added successfully' );
          })
      }
    });

    modal.present();
  }

  /**
   *
   * @param _message
   * @private
   */
  _quickToast(_message){
    const toast = this.toastCtrl.create({
      message: _message,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }
}
