import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  public propertyRef:firebase.database.Reference;
  public propertyList:Array<any>;
  public loadedPropertyList:Array<any>;
  loader:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     db: AngularFireDatabase,
      private alertCtrl:AlertController,
     public modalCtrl: ModalController,
     public loadingCtrl:LoadingController
    ) {
 
  }

  getData() {
    console.log('ionViewDidLoad NoticeBoardPage');
    this.propertyRef = firebase.database().ref('/news');
    this.propertyRef.orderByChild("newstatus").equalTo("current").on('value', propertyList => {
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
        content: "News & Media loading, Please wait..."
       // ,duration: 3000
    });
    this.loader.present();
   // this.hideloading();
}


}
