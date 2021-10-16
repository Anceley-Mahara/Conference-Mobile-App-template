import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

/**
 * Generated class for the SponsorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-sponsors',
  templateUrl: 'sponsors.html',
})
export class SponsorsPage {
  public platinumRef:firebase.database.Reference;
  public platinumList:Array<any>;
  public loadedplatinumList:Array<any>;

  public goldRef:firebase.database.Reference;
  public goldList:Array<any>;
  public loadedgoldList:Array<any>;

  public diamondRef:firebase.database.Reference;
  public diamondList:Array<any>;
  public loadeddiamondList:Array<any>;

  public silverRef:firebase.database.Reference;
  public silverList:Array<any>;
  public loadedsilverList:Array<any>;

  loader:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     db: AngularFireDatabase,
    //  private alertCtrl:AlertController,
     public modalCtrl: ModalController,
     public loadingCtrl:LoadingController
    ) {
 
  }

  getData(){
    
    this.platinumRef = firebase.database().ref('/sponsors');

    this.platinumRef.orderByChild("sponsorship").equalTo("platinum").on('value', platinumList => {
      let plat = [];
        platinumList.forEach( platinum => {
            plat.push(platinum.val());
            return false;
        });

        this.platinumList = plat;
        this.loadedplatinumList = plat;
    });

    this.diamondRef = firebase.database().ref('/sponsors');

    this.diamondRef.orderByChild("sponsorship").equalTo("diamond").on('value', diamondList => {
      let diam = [];
        diamondList.forEach( diamond => {
            diam.push(diamond.val());
            return false;
        });

        this.diamondList = diam;
        this.loadeddiamondList = diam;
    });

    this.goldRef = firebase.database().ref('/sponsors');

    this.goldRef.orderByChild("sponsorship").equalTo("gold").on('value', goldList => {
      let gol = [];
        goldList.forEach( gold => {
            gol.push(gold.val());
            return false;
        });

        this.goldList = gol;
        this.loadedgoldList = gol;
    });

    this.silverRef = firebase.database().ref('/sponsors');

    this.silverRef.orderByChild("sponsorship").equalTo("silver").on('value', silverList => {
      let silv = [];
        silverList.forEach( silver => {
            silv.push(silver.val());
            return false;
        });

        this.silverList = silv;
        this.loadedsilverList = silv;
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
