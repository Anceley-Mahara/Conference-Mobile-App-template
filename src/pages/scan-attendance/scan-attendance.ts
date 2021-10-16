import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
/**
 * Generated class for the ScanAttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-scan-attendance',
  templateUrl: 'scan-attendance.html',
})
export class ScanAttendancePage {
  public eventRef:firebase.database.Reference;
  public eventList:Array<any>;
  public loadedEventList:Array<any>;

  jsonstr: any;
  lots:any;
  startdate:any;
  auctiondate:any;
  temp:any;
  lengthLeft:any;
  questions:any;
  timestamp:any;
  lookupresult:any;
  contacts:any;
  auctionsList: Array<String>; 
  scanCodeData: {};
    options: BarcodeScannerOptions;
    public event = {
      month: '2100-12-31',
      timeStarts: '07:43',
      timeEnds: '2100-12-31'
    }
  constructor(public navCtrl: NavController,
    db:AngularFireDatabase, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
 
    this.contacts = db.list('/contacts');
    this.timestamp = firebase.database.ServerValue.TIMESTAMP;

    
  /*  this.eventRef = firebase.database().ref('/exhibitors');
    this.eventRef
    .on('value', eventList => {
   // this.propertyRef.on('value', propertyList => {
        let props = [];
        eventList.forEach( property => {
            props.push(property.val());
            return false;
        });
 
        this.eventList = props;
        this.loadedEventList = props;
    });*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }

  @ViewChild('myInput') myInput: ElementRef;

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
}

checkLength(question){
  this.lengthLeft =  180 - question.length;
  //console.log(question.length)
}

  saveContact(scandata,question){
    Promise.resolve(this.contacts.push
      ({       scandata: scandata,
        question: question,
          timestamp: this.timestamp,
          owner: (JSON.parse(localStorage.getItem('ictemail')))
      })
      )
  }

  Qrscan(){
    this.options = {
      prompt : "Place a barcode inside the scan area",
      showFlipCameraButton : true,
      showTorchButton : true
  }
  this.barcodeScanner.scan(this.options).then((barcodeData) => {
  
      //console.log(barcodeData);
      this.scanCodeData = barcodeData;
      this.temp = this.scanCodeData
     // this.lookupdetails(this.temp.text.substring(33))
  }, (err) => {
      console.log("Error occured : " + err);
  });
  }

}
