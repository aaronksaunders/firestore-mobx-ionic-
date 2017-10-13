import { observable, action  } from 'mobx-angular';
import { Injectable } from '@angular/core';
import  firestoreService  from './services/firestore-service'

class ThingState {
  @observable things = []
  @observable isLoading = true
  @observable isSaving = false

  fs : any;

  @action addThing(_object) {
    this.isSaving = true;
    return this.fs.saveObject("things", _object).then((result) => {
      this.isSaving = false
      debugger
      this.things.unshift(_object)
    })
  }
  @action removeThing(_item) {
    return this.fs.deleteObject("things", _item).then((result) => {
      this.things = this.things.filter(t => {
        return t.id !== _item.id
      })
      return true
    })
  }

  @action loadAll() {
    this.fs = firestoreService
    this.fs.enablePersistance(false)
      .then(() => {return this.fs.getAllObjects("things")})
      .then((result) => {

        this.things = result
        this.isLoading = false
      }, err => { })
  }

  constructor() {

  }
}

const thingState = new ThingState();
export default thingState
