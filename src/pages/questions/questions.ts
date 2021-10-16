import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase
    } from 'angularfire2/database';
import firebase from 'firebase';

/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {
  public day2Ref:firebase.database.Reference;
  public day2List:Array<any>;
  public loadedDay2List:Array<any>;

  public day1Ref:firebase.database.Reference;
  public day1List:Array<any>;
  public loadedDay1List:Array<any>;

  timestamp:any;
  loader:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     db: AngularFireDatabase,
      private alertCtrl:AlertController,
     public modalCtrl: ModalController,
     public loadingCtrl:LoadingController
    ) 
     {
       this.timestamp = firebase.database.ServerValue.TIMESTAMP;
 }

 getData(){

  this.day2Ref = firebase.database().ref('/questions/');
 // this.day2Ref.orderByChild("day").equalTo("Day 2").on('value', day2List => {
  this.day2Ref.on('value', day2List => {
      let props = [];
      day2List.forEach( property => {
          props.push(property.val());
          return false;
      });

      this.day2List = props;
      this.loadedDay2List = props;
      this.hideLoading();
  });

  this.day1Ref = firebase.database().ref('/eventquestions/');
  // this.day2Ref.orderByChild("day").equalTo("Day 2").on('value', day2List => {
   this.day1Ref.on('value', day1List => {
       let props = [];
       day1List.forEach( property => {
           props.push(property.val());
           return false;
       });
 
       this.day1List = props;
       this.loadedDay1List = props;
       this.hideLoading();
   });
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');
    this.presentLoading();
    this.getData();
  }

  hideLoading(){
    this.loader.dismiss();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
        content: "Questions loading, Please wait..."
       // ,duration: 3000
    });
    this.loader.present();
   // this.hideloading();
}

}
