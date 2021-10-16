import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

/**
 * Generated class for the NoticeBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-notice-board',
  templateUrl: 'notice-board.html',
})
export class NoticeBoardPage {
  public platinumRef:firebase.database.Reference;
  public platinumList:Array<any>;
  public loadedplatinumList:Array<any>;
  loader:any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
     db: AngularFireDatabase,
      private alertCtrl:AlertController,
     public modalCtrl: ModalController,
     public loadingCtrl:LoadingController
    
  ) {
   }

  getData() {
    console.log('ionViewDidLoad NoticeBoardPage');
    this.platinumRef = firebase.database().ref('/noticeboard');

    this.platinumRef.orderByChild("status").equalTo("active").on('value', platinumList => {
      let plat = [];
        platinumList.forEach( platinum => {
            plat.push(platinum.val());
            return false;
        });

        this.platinumList = plat;
        this.loadedplatinumList = plat;
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
        content: "Notices loading, Please wait..."
       // ,duration: 3000
    });
    this.loader.present();
   // this.hideloading();
}


}
