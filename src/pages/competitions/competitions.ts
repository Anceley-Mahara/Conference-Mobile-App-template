import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
/**
 * Generated class for the CompetitionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-competitions',
  templateUrl: 'competitions.html',
})
export class CompetitionsPage {
    public propertyRef:firebase.database.Reference;
    public propertyList:Array<any>;
    public loadedPropertyList:Array<any>;

    public smsRef:firebase.database.Reference;
    public smsList:Array<any>;
    public loadedSMSList:Array<any>;

  constructor(public navCtrl: NavController,private alertCtrl:AlertController,  db:AngularFireDatabase, public navParams: NavParams, private sms: SMS) {
    this.propertyRef = firebase.database().ref('/competitions');
    this.propertyRef.orderByChild("type").equalTo("APP").on('value', propertyList => {
   // this.propertyRef.on('value', propertyList => {
        let props = [];
        propertyList.forEach( property => {
            props.push(property.val());
            return false;
        });
 
        this.propertyList = props;
        this.loadedPropertyList = props;
    });


    this.smsRef = firebase.database().ref('/competitions');
    this.smsRef.orderByChild("type").equalTo("SMS").on('value', smsList => {
   // this.propertyRef.on('value', propertyList => {
        let props = [];
        smsList.forEach( property => {
            props.push(property.val());
            return false;
        });
 
        this.smsList = props;
        this.loadedSMSList = props;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompetitionsPage');
  }

showConfirm(phonenum, answer) {
        let confirm = this.alertCtrl.create({
            title: 'You are about to join a competition',
            message: 'Please note that this action may lead to deductions from your mobile subscription balance?',
            buttons: [
                {
                    text: 'Delicne',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Accept',
                    handler: () => {
                        console.log('Agree clicked');
                        this.send(phonenum, answer);
                    }
                }
            ]
        });
        confirm.present();
    }


send(phonenum, answer){
  this.sms.send(phonenum, answer);
    this.showSuccesfulUploadAlert();
}

    showSuccesfulUploadAlert() {
        let alert = this.alertCtrl.create({
            title: 'Successful!',
            subTitle: 'SMS Sent!',
            buttons: ['OK']
        });
        alert.present();
        // clear the previous photo data in the variable
    }

}
