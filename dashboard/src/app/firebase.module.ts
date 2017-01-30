import { NgModule } from '@angular/core';
import {AngularFireModule, FirebaseAppConfig} from "angularfire2";

const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBO5SxZIlHXR0e2UVY6YJXwp7-uN-ymFTo",
  authDomain: "munichapi.firebaseapp.com",
  databaseURL: "https://munichapi.firebaseio.com",
  storageBucket: "munichapi.appspot.com",
  messagingSenderId: "1047530724009"
};

@NgModule({
  imports: [ AngularFireModule.initializeApp(firebaseConfig) ],
  exports: [ AngularFireModule ],
  declarations: []
})
export class FirebaseModule { }
