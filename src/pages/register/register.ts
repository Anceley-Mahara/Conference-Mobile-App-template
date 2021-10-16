import { Component } from '@angular/core';
import { Nav, NavController, NavParams,AlertController, ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase
    } from 'angularfire2/database';
//import firebase from 'firebase';
import {LoginPage} from '../login/login';
import {ComingUpPage} from '../coming-up/coming-up';
//import { Facebook } from '@ionic-native/facebook';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
fullname:any;
email:any;
password:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
        public nav: Nav,
        //public facebook: Facebook,
    private alertCtrl:AlertController,
    public modalCtrl: ModalController,
    public af:AngularFireDatabase,
    public afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  signup(fullname: string, email: string, password: string) {
    console.log(email);
    console.log(password);

    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        localStorage.setItem('ictemail', JSON.stringify(email)); 
        this.nav.setRoot(ComingUpPage);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        //this.ionViewDidEnter();
      });    
  }

  login() {
    this.nav.setRoot(LoginPage);
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'An error occured during login, please check your internet connection and try again!',
      buttons: ['OK']
    });
    alert.present();
  }
/*
  facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
  
        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => { 
            console.log("Firebase success: " + JSON.stringify(success)); 
            this.nav.setRoot(ComingUpPage);
          });
  
      }).catch((error) => { console.log(error) });
  }
*/
}
