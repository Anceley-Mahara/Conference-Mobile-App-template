import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { LoginPage} from '../login/login';

/**
 * Generated class for the OngoingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ongoing',
  templateUrl: 'ongoing.html',
})
export class OngoingPage {
  public propertyRef:firebase.database.Reference;
  public propertyList:Array<any>;
  
  public loadedPropertyList:Array<any>;
  ongoing:any;
  lengthLeft:any;
  questions:any;
  item:any;
profile:any;
  timestamp:any;
  activity:any;
  logs: any;
  eventname:any;
  loader:any;
  updateAccount:any;

  public profileList:Array<any>;
  public loadedProfileList:Array<any>;
  public profileRef:firebase.database.Reference;

  constructor(public navCtrl: NavController,
    db:AngularFireDatabase, public navParams: NavParams,private alertCtrl:AlertController,
    public modalCtrl: ModalController,public loadingCtrl:LoadingController) {
      this.timestamp = firebase.database.ServerValue.TIMESTAMP;
      this.questions = db.list('/eventquestions');
      this.logs = db.list('/activitylog');

    //  this.updateAccount.id = this.params.get('key');

      this.profileRef = firebase.database().ref('/accounts');
      //console.log(JSON.parse(localStorage.getItem('email')))
      console.log(JSON.stringify(this.updateAccount));
      this.profileRef
      .orderByChild('email')
      .equalTo(JSON.parse(localStorage.getItem('ictemail')))
      .on('value', profileList => {
        let profile = [];
        profileList.forEach( profiles => {
          profile.push(profiles.val());
          return false;
        });
    
        this.profileList = profile;
        this.loadedProfileList = profile;
        console.log(JSON.parse(localStorage.getItem('email')))
        console.log(JSON.stringify(this.profileList));
       // this.updateAccount = this.params.get('profile.role');
console.log(this.profile);
    });

//    localStorage.setItem('ictemail', JSON.stringify(email)); 
    }

  
  getData(){
    this.propertyRef = firebase.database().ref('/events');
    this.propertyRef.orderByChild("eventstatus").equalTo("current").on('value', propertyList => {
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
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComingUpPage');
    this.presentLoading();
    this.getData();
    if (localStorage.getItem('ictemail') == null) {
      this.navCtrl.setRoot(LoginPage);
  } else {
     // this.alertLogin()
  }
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

  @ViewChild('myInput') myInput: ElementRef;

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
}

checkLength(question){
  this.lengthLeft =  180 - question.length;
  //console.log(question.length)
}

question(item, question)
{
  //this.eventname = item.eventname
        Promise.resolve(this.questions.push
    ({eventname:item.eventname,
        timestamp: this.timestamp,
        question: question,
        username: (JSON.parse(localStorage.getItem('ictemail')))})
    .then( newQuestionnaire => {
            let alert = this.alertCtrl.create({
                title: 'Question Submitted',
                message: 'Thank you for asking a question, the moderators will revert back to you soon',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            //console.log('Logout clicked');
                            this.questions = '';
                            this.activity="Question Submitted";
                            this.logActivity(this.activity);
                        }
                    }
                ]
            });
            alert.present();
        },
    error => {console.log("not good");}));
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
