import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase
    } from 'angularfire2/database';
import firebase from 'firebase';
/**
 * Generated class for the ActionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-action',
  templateUrl: 'action.html',
})
export class ActionPage {
  items: any;
  timestamp: any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public af:AngularFireDatabase) 
    {
    this.items = af.list('/submittedads');
    this.timestamp = firebase.database.ServerValue.TIMESTAMP;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActionPage');
  }

}
