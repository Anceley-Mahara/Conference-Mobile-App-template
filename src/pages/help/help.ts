import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
contact: any;
helpme:any;
timestamp:any;
issue: any;
activity:any;
logs: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, af:AngularFireDatabase,            
    private alertCtrl:AlertController
    //, private alertCtrl: AlertController
    , public loadingCtrl: LoadingController) {
    this.helpme = af.list('/help');
    this.logs = af.list('/activitylog');
    this.timestamp = firebase.database.ServerValue.TIMESTAMP;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  @ViewChild('myInput') myInput: ElementRef;

resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
}

/*help(mystuff){
  console.log(mystuff)
  this.myStuff = '';
}*/

help(issue,contact)
{
        Promise.resolve(this.helpme.push
    ({issue,
        contact: contact,
        timestamp: this.timestamp,
        username: (JSON.parse(localStorage.getItem('ictemail')))})
    .then( newQuestionnaire => {
            let alert = this.alertCtrl.create({
                title: 'Help Submitted',
                message: 'Thank you for contacting us, a call centre agent will contact you on the issue you have highlighted',
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            //console.log('Logout clicked');
                            this.issue = '';
                            this.contact='';
                            this.activity="Help Submitted";
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
          owner: (JSON.parse(localStorage.getItem('email')))
      })
      )
 }
}
