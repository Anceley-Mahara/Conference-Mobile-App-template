import { Component } from '@angular/core';
import { NavController, NavParams,
  AlertController, 
  ModalController, ToastController } from 'ionic-angular';
  import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase
    } from 'angularfire2/database';
import {RegisterPage} from '../register/register';
import {OngoingPage} from '../ongoing/ongoing';

//import firebase from 'firebase';
//import { Facebook } from '@ionic-native/facebook'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email:any;
  password:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public forgotCtrl: AlertController, 
    public toastCtrl: ToastController,
    //    public nav: Nav,public facebook: Facebook,
    private alertCtrl:AlertController,
    public modalCtrl: ModalController,
    public af:AngularFireDatabase,
    public afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  register() {
    this.navCtrl.setRoot(RegisterPage);
  }

  forgotPass(email) {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            this.afAuth.auth.sendPasswordResetEmail(email);
            let toast = this.toastCtrl.create({
              message: 'Email was sent successfully',
              duration: 3000,
              position: 'middle',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

  login(email: string, password: string) {
    if (localStorage.getItem('ictemail') !== null) {
      let alert = this.alertCtrl.create({
        title: 'Already logged in',
        message: 'You are currently logged in as '+localStorage.getItem('ictemail'),
        buttons: [
            {
                text: 'OK',
                handler: () => {

                }
            }
        ]
    });
    alert.present();
    } 
    else {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        localStorage.setItem('ictemail', JSON.stringify(email)); 
           let toast = this.toastCtrl.create({
                  message: 'login successful',
                  duration: 3000,
                  position: 'middle',
                  cssClass: 'dark-trans',
                  closeButtonText: 'OK',
                  showCloseButton: true
                });
                toast.present();
                this.navCtrl.setRoot(OngoingPage);
            
      })
      .catch(err => {

        let loginerror = this.forgotCtrl.create({
          title: 'An Error Occured?',
          message: "Please check your username and password, or choose forgot password ErrorCode: "+ err,
          buttons: [
            {
              text: 'Ok',
              handler: data => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        loginerror.present();
      

        console.log('Something went wrong:',err.message);
      //  this.ionViewDidEnter();
      });
    }
  }


/*  facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
  
        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => { 
            console.log("Firebase success: " + JSON.stringify(success)); 
          });
  
      }).catch((error) => { console.log(error) });
  }*/
}
