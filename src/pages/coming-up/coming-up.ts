import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ActionSheetController, ActionSheet, NavController, AlertController, ToastController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { FirebaseDetail } from '../firebase-detail/firebase-detail';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the ComingUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-coming-up',
  templateUrl: 'coming-up.html',
})
export class ComingUpPage {
  public propertyRef:firebase.database.Reference;
  public propertyList:Array<any>;
  public loadedPropertyList:Array<any>;
  timestamp:any;
  issue: any;
  activity:any;
  logs: any;
  loader:any;
  admin:any;
  //public admin: AngularFireList<any>;

  constructor(   db: AngularFireDatabase,
    public platform: Platform,
//              private storage: Storage,
public af:AngularFireDatabase,
    public navCtrl:NavController,
    private alert: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController ,
    private socialSharing: SocialSharing,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth
  ) {


    this.logs = af.list('/activitylog');
    this.timestamp = firebase.database.ServerValue.TIMESTAMP;
    this.admin = af.list('/useradmin');//, ref => ref.orderByChild('email').equalTo('lmavonyani@gmail.com'))
    console.log(this.admin);
  }

  async onNotification() {
    try {
        await this.platform.ready();

        FCMPlugin.onNotification((data) => {
          this.alert.create({
              message: data.message
          }).present();
        }, (error) => console.error(error));
    }
    catch(e) {
        console.error(e);
    }


  
  }

  getData(){
    this.propertyRef = firebase.database().ref('/events');
    this.propertyRef.orderByChild("eventstatus").equalTo("coming").on('value', propertyList => {
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

    this.onNotification();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComingUpPage');
    this.presentLoading();
    this.getData();
    
  }

  hideLoading(){
    this.loader.dismiss();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
        content: "Events loading, Please wait..."
       // ,duration: 3000
    });
    this.loader.present();
   // this.hideloading();
}

itemTapped(event, item) {
  this.navCtrl.push(FirebaseDetail, {
      item: item
  });
}

socialshare(item) {
  if (localStorage.getItem('ictemail') == null) {
      this.promptAuthenticate()
  } else {
  
  let actionSheet: ActionSheet = this.actionSheetCtrl.create({
      title: 'Share via',
      buttons: [
          {
              text: 'Facebook',
              icon: 'md-thumbs-up',
              handler: () =>{
                  this.activity = "shared advert via facebook";
                  this.logActivity(this.activity);
             this.socialSharing.shareViaFacebook('Check out the event, *"'+item.eventname+'"*, this is a brief of the event: *"'+item.brief+'"*. I found this event on the ICT summit app, you can download the ICT Summit app for more alerts on events like this, alternatively visit the website for details', '', ''+item.website+'').then(() => {
                        // Success!
                        let toast = this.toastCtrl.create({
                            message: 'Shared ' + item.eventname + 'via Facebook successfully',
                            cssClass: 'mytoast',
                            duration: 2000
                        });
                        toast.present(toast);

                  }).catch(() => {
                        // Error!
                  })
          }
          },
          {
              text: 'Email',
              icon: 'mail-open',
              handler: () =>{
             this.socialSharing.shareViaEmail('Check out the event, *"'+item.eventname+'"*, this is a brief of the event: *"' +item.brief+ '"*. I found this event on the ICT summit app, you can download the ICT Summit app for more alerts on events like this, alternatively visit the website for details', ''+item.website+'', ['']).then(() => {
                        // Success!
                        this.activity = "shared advert via email";
                        this.logActivity(this.activity);
                        let toast = this.toastCtrl.create({
                            message: 'Shared ' + item.eventname + 'via email successfully',
                            cssClass: 'mytoast',
                            duration: 2000
                        });
                        toast.present(toast);

                  }).catch(() => {
                        // Error!
                  })
          }},
          {
              text: 'SMS',
              icon: 'mail',
              handler: ()  =>{
             this.socialSharing.shareViaSMS('Check out the event, *"'+item.ctcompany+'"*, this is a brief of the event: *"' +item.brief+ '"*. I found this event on the ICT summit app, you can download the ICT Summit app for more alerts on events like this, alternatively visit the website for details'+item.website+'','').then(() => {
                        // Success!
                        this.activity = "shared advert via SMS";
                        this.logActivity(this.activity);
                        let toast = this.toastCtrl.create({
                            message: 'Shared ' + item.eventname + 'via SMS successfully',
                            cssClass: 'mytoast',
                            duration: 2000
                        });
                        toast.present(toast);

                  }).catch(() => {
                        // Error!
                  })
          }
          },
          {
              text: 'WhatsApp',
              icon: 'chatbubbles',
              handler: () =>{
             this.socialSharing.shareViaWhatsApp('Check out the event, *"'+item.eventname+'"*, this is a brief of the event: *"' +item.brief+ '"*. I found this event on the ICT summit app, you can download the ICT Summit app for more alerts on events like this, alternatively visit the website for details', '', ''+item.ctwebsite+'').then(() => {
                        // Success!
                        this.activity = "shared advert via whatsapp";
                        this.logActivity(this.activity);
                        let toast = this.toastCtrl.create({
                            message: 'Shared ' + item.eventname + 'via whatsapp successfully',
                            cssClass: 'mytoast',
                            duration: 2000
                        });
                        toast.present(toast);

                  }).catch(() => {
                        // Error!
                  })
          }
          },
          {
              text: 'Cancel',
              role: 'cancel',
              handler: () => console.log('cancel share')
          }
      ]
  });

  actionSheet.present();
}
}


promptAuthenticate(){
  const prompt = this.alert.create({
      title: 'Login Required',
      message: "To share this event, you need to be registered and logged in. Use a valid email and password",
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
            this.navCtrl.setRoot(ComingUpPage);
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
        }
      ]
    });
    prompt.present();
  }

  alertLogin() {
    
  }

  showAlert() {
    const alert = this.alert.create({
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

logActivity(activity){
  Promise.resolve(this.logs.push
      ({       activity: activity,
          timestamp: this.timestamp,
          owner: (JSON.parse(localStorage.getItem('email')))
      })
      )
 }


 ionViewDidEnter(){
  //this.loadData();
/*if (localStorage.getItem('ictemail') == null) {
  this.promptAuthenticate()
} else {
  this.alertLogin()
}*/
}
}
