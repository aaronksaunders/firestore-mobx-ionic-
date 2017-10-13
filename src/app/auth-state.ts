import mobx, {computed, observable, action} from "mobx"
import firestoreService from './services/firestore-service'


class AuthStore {

  @observable authorized = null;
  @observable currentUser = null;
  @observable error = null;


  constructor() {

  }

  @action
  initialize() {
    return new Promise((resolve, reject) => {
      let handler = (user) => {

        if (user) {
          this.error = null;
          this.currentUser = user;

          console.log("state changed, has user")
          return resolve(this.currentUser)
        } else {
          this.error = null;
          this.currentUser = null;
          console.log("state changed, has NO user")
          return resolve(this.currentUser)
        }
      };

      firestoreService.doCheckAuth(handler)
    })

  }

  @computed
  get isAuthenticated() {
    return this.authorized ? true : false
  }

  @action
  login(_credentials) {
    return firestoreService.login(_credentials)
      .then(() => {
        console.log("login success")
        return true
      })
  }


  @action
  logout() {
    return firestoreService.logout()
      .then(() => {
        console.log("logout")
        return true
      })
  }
}

const authStore = new AuthStore();

export default authStore
