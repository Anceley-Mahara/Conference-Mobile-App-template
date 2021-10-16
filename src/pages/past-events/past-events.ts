import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

/**
 * Generated class for the PastEventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-past-events',
  templateUrl: 'past-events.html',
})
export class PastEventsPage {
  public propertyRef:firebase.database.Reference;
  public propertyList:Array<any>;
  public loadedPropertyList:Array<any>;
  loader:any;

  constructor(public navCtrl: NavController,db:AngularFireDatabase, public navParams: NavParams, public loadingCtrl:LoadingController ) {

  }

 
  getData(){
    this.propertyRef = firebase.database().ref('/events');

    this.propertyRef.orderByChild("eventstatus").equalTo("past").on('value', propertyList => {
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

}
