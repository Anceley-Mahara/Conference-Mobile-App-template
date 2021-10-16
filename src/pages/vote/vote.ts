import { Component } from '@angular/core';
import { Nav, NavController, NavParams,AlertController, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase
    } from 'angularfire2/database';
import firebase from 'firebase';
import { ComingUpPage } from '../coming-up/coming-up';

/**
 * Generated class for the VotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vote',
  templateUrl: 'vote.html',
})
export class VotePage {
  public propertyRef:firebase.database.Reference;
  public propertyList:Array<any>;
  public loadedPropertyList:Array<any>;
  contact: any;
  vote:any;
  timestamp:any;
  issue: any;
  activity:any;
  logs: any;
  exhibitor:any;
  loader:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public nav: Nav,
    private alertCtrl:AlertController,
    public modalCtrl: ModalController,
    public af:AngularFireDatabase,
    public loadingCtrl:LoadingController,
    public afAuth: AngularFireAuth) {
      this.vote = af.list('/vote');
      this.logs = af.list('/activitylog');
      this.timestamp = firebase.database.ServerValue.TIMESTAMP;


  }


getData(){
  this.propertyRef = firebase.database().ref('/exhibitors');
  this.propertyRef
/*  .orderByChild("state")
  .equalTo("ACTIVE")*/
  .on('value', propertyList => {
 // this.propertyRef.on('value', propertyList => {
      let props = [];
      propertyList.forEach( property => {
          props.push(property.val());
          return false;
      });

      this.propertyList = props;
      this.loadedPropertyList = props;
      this.hideLoading();
  });
}

  ionViewDidEnter(){
    //this.loadData();
if (localStorage.getItem('ictemail') == null) {
    this.promptAuthenticate()
} else {
    this.alertLogin()
}
  }

  promptAuthenticate(){
    const prompt = this.alertCtrl.create({
        title: 'Login Required',
        message: "To vote, you need to be registered and logged in. Use a valid email and password",
        inputs: [
          {
            name: 'email',
            placeholder: 'Email',
            type: 'email'
          }, {
            name: 'password',
            placeholder: 'Password',
            type: 'password'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
              this.nav.setRoot(ComingUpPage);
            }
          },
          {
            text: 'Register',
            handler: data => {
              console.log('Saved clicked'+ data.email+data.password);
              
              this.signup(data.email, data.password)
            }
          },
          {
            text: 'Login',
            handler: data => {
              console.log('Login clicked');
              this.login(data.email, data.password)
            }
          },
          {
            text: 'Reset Password',
            handler: data => {
              console.log('Login clicked');
              this.resetPassword(data.email)
            }
          }
        ]
      });
      prompt.present();
    }
  
    alertLogin() {
      this.presentLoading();
      this.getData();
    }


    hideLoading(){
      this.loader.dismiss();
    }
  
    presentLoading() {
      this.loader = this.loadingCtrl.create({
          content: "Exhibitors loading, Please wait..."
         // ,duration: 3000
      });
      this.loader.present();
     // this.hideloading();
  }
  


    showAlert() {
      const alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'An error occured during login, please check your internet connection and try again!',
        buttons: ['OK']
      });
      alert.present();
    }
  

  signup(email: string, password: string) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        localStorage.setItem('ictemail', JSON.stringify(email)); 
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.ionViewDidEnter();
      });    
  }

  login(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        localStorage.setItem('ictemail', JSON.stringify(email)); 
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.ionViewDidEnter();
      });
  }

  logout() {
    this.afAuth
      .auth
      .signOut();
  }

  resetPassword(email: string) {
   // var auth = firebase.auth();
    this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => {this.passwordResetAlert(email)})
      .catch((error) => {this.ionViewDidEnter()})
  }

  votenow(exhibitor)
  {
          Promise.resolve(this.vote.push
      ({exhibitor,
          timestamp: this.timestamp,
          username: (JSON.parse(localStorage.getItem('ictemail')))})
      .then( newQuestionnaire => {
              let alert = this.alertCtrl.create({
                  title: 'Vote Submitted',
                  message: 'Thank you for voting for your favourite stand',
                  buttons: [
                      {
                          text: 'OK',
                          handler: () => {
                              //console.log('Logout clicked');
                              this.exhibitor = '';
                              this.activity="Vote Submitted";
                              this.logActivity(this.activity);
                          }
                      }
                  ]
              });
              alert.present();
          },
      error => {console.log("not good");}));
  }
  
  passwordResetAlert(email) {
    let alert = this.alertCtrl.create({
        title: 'Reset Email Sent!',
        subTitle: 'Please check your email '+email+' for a reset email, If you did not receive the email check the email spelling and try again',
        buttons: ['OK']
    });
    alert.present();
    this.activity = "Password reset for"+email;
    this.logActivity(this.activity);
    this.ionViewDidEnter();
}

  logActivity(activity){
    Promise.resolve(this.logs.push
        ({       activity: activity,
            timestamp: this.timestamp,
            owner: (JSON.parse(localStorage.getItem('ictemail')))
        })
        )
   }

}
