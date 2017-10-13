import {Injectable} from '@angular/core';
import firebase from 'firebase';
// Required for side-effects
import 'firebase/firestore'

 class FirestoreService {

  DATA = {};
  CURRENT_USER = null;
  db;


  constructor() {

    if (firebase.apps.length === 0) {
      var config = {
        apiKey: "AIzaSyBSQabWzNXt8WzRNim_5F0EtVH7fj-TB-0",
        authDomain: "myawesomeproject-7aeff.firebaseapp.com",
        databaseURL: "https://myawesomeproject-7aeff.firebaseio.com",
        projectId: "myawesomeproject-7aeff",
        storageBucket: "myawesomeproject-7aeff.appspot.com",
        messagingSenderId: "934285685644"
      };
      let app = firebase.initializeApp(config);
      console.log("firebase app", app)
    }

  }

  enablePersistance = (_enable) => {
    return new Promise((resolve, reject) => {

      if (_enable === false) {
        // Initialize Cloud Firestore through firebase
        this.db = firebase.firestore();
        console.log("firestore database", this.db);
        console.log("no persistence");
        return resolve(true)
      }

      firebase.firestore().enablePersistence()
        .then(() => {
          // Initialize Cloud Firestore through firebase
          this.db = firebase.firestore();
          console.log("firestore database", this.db);
          return resolve(true)
        })
        .catch((err) => {
          if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
            alert('failed-precondition')
            return reject('failed-precondition')
          } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
            alert('unimplemented')
            return reject('unimplemented')
          }
        });
    })
  }

  hasUser = () => {
    return this.CURRENT_USER
  }

  // getItem = (_id) => {
  //   let results = this.ASSETS.filter((_item) => {
  //     return _item.id === _id
  //   });
  //
  //   return results.length ? results[0] : null;
  // }
  //

  doCheckAuth(_handler) {
    const auth = firebase.auth();
    auth.onAuthStateChanged(_handler);
  }

  /**
   *
   * @param {any} email
   * @param {any} password
   * @returns {Promise<any>}
   */
  login = ({email, password}) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

   /**
    *
    * @returns {Promise<any>}
    */
   logout = () => {
     this.CURRENT_USER = null
     return firebase.auth().signOut()
   }


  // createUser = (_credentials) => {
  //   return firebase.createUser(_credentials)
  // }
  //
  //

  //
  //
  // resetPassword = (_email) => {
  //   return firebase.resetPassword(_email)
  // }

  saveObject = (_objectType, _objectParams) => {
    return this.db.collection(_objectType).add(_objectParams)
      .then((docRef) => {
        console.log(`Document ${_objectType} written with ID: ${docRef.id}`);
        return {id: docRef.id, ..._objectParams}
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        return error
      });
  }

  deleteObject = (_objectType, _item) => {
    return this.db.collection(_objectType).doc(_item.id).delete();
  }

  getAllObjects = (_objectType): Promise<any[]> => {

    this.DATA[_objectType] = []

    try {

      return this.db.collection(_objectType).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {

            var source = querySnapshot.metadata.fromCache ? "local cache" : "server";
            console.log("Data came from " + source);

            console.log(doc.id, " => ", doc.data());
            this.DATA[_objectType].push({
              id: doc.id,
              ...doc.data()
            })
          });

          return this.DATA[_objectType]
        }, (error) => {
          console.log("query error", error)
        });
    } catch (ee) {
      console.log(ee)
    }
  }

}

export default new FirestoreService()
