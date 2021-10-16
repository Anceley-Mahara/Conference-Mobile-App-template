import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase
    } from 'angularfire2/database';
import firebase from 'firebase';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the VideosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {

  public day1Ref:firebase.database.Reference;
  public day1List:Array<any>;
  public loadedDay1List:Array<any>;

  public day2Ref:firebase.database.Reference;
  public day2List:Array<any>;
  public loadedDay2List:Array<any>;
  loader:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams
    ,public sanitizer: DomSanitizer,
      db: AngularFireDatabase,
      private alertCtrl:AlertController,
     public modalCtrl: ModalController,
     public loadingCtrl:LoadingController
  ) {



   // this.youtubeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(‘https://www.youtube.com/embed/’+this.trailer['yv’]);

  }


  getData(){
    this.day1Ref = firebase.database().ref('/videos/');
      this.day1Ref.orderByChild("type").equalTo("recorded").on('value', day1List => {
    //  this.day1Ref.on('value', day1List => {
          let props = [];
          day1List.forEach( property => {
              props.push(property.val());
              return false;
          });
   
          this.day1List = props;
          this.loadedDay1List = props;
          
      });

      this.day2Ref = firebase.database().ref('/videos/');
        this.day2Ref.orderByChild("type").equalTo("live").on('value', day2List => {
      //  this.day2Ref.on('value', day2List => {
            let props = [];
            day2List.forEach( property => {
                props.push(property.val());
                return false;
            });
     
            this.day2List = props;
            this.loadedDay2List = props;
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
        content: "Sponsors loading, Please wait..."
       // ,duration: 3000
    });
    this.loader.present();
   // this.hideloading();
}



}
