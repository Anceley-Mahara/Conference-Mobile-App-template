import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { List } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase
    } from 'angularfire2/database';
import firebase from 'firebase';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';

//import { ConferenceData } from '../../providers/conference-data';
//import { UserData } from '../../providers/user-data';

//import { SessionDetailPage } from '../session-detail/session-detail';
//import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';


@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;

  quest: any;
 timestamp: any;

  public propertyRef:firebase.database.Reference;
  public propertyList:Array<any>;
  public loadedPropertyList:Array<any>;

  public day1Ref:firebase.database.Reference;
  public day1List:Array<any>;
  public loadedDay1List:Array<any>;

  public day2Ref:firebase.database.Reference;
  public day2List:Array<any>;
  public loadedDay2List:Array<any>;

  public day3Ref:firebase.database.Reference;
  public day3List:Array<any>;
  public loadedDay3List:Array<any>;

  constructor( public navCtrl: NavController, 
    public navParams: NavParams,
     db: AngularFireDatabase,
      private alertCtrl:AlertController,
     public modalCtrl: ModalController,
     public loadingCtrl:LoadingController
    
  ) {
    this.quest = db.list('/questions');
    this.timestamp = firebase.database.ServerValue.TIMESTAMP;
    this.propertyRef = firebase.database().ref('/group/');
    this.propertyRef
    //.orderByChild("eventstatus")
  //  .equalTo("coming")
    .on('value', propertyList => {
   // this.propertyRef.on('value', propertyList => {
        let props = [];
        propertyList.forEach( property => {
            props.push(property.val());
            return false;
        });
 
        this.propertyList = props;
        this.loadedPropertyList = props;
    });

    this.day1Ref = firebase.database().ref('/sessions/');
    this.day1Ref.orderByChild("day").equalTo("Day 1").on('value', day1List => {
   // this.day1Ref.on('value', day1List => {
        let props = [];
        day1List.forEach( property => {
            props.push(property.val());
            return false;
        });
  
        this.day1List = props;
        this.loadedDay1List = props;
    });
  
  
    this.day2Ref = firebase.database().ref('/sessions/');
    this.day2Ref.orderByChild("day").equalTo("Day 2").on('value', day2List => {
   // this.day1Ref.on('value', day1List => {
        let props = [];
        day2List.forEach( property => {
            props.push(property.val());
            return false;
        });
  
        this.day2List = props;
        this.loadedDay2List = props;
    });
  
  
  
    this.day3Ref = firebase.database().ref('/sessions/');
    this.day3Ref.orderByChild("day").equalTo("Day 3").on('value', day3List => {
   // this.day1Ref.on('value', day1List => {
        let props = [];
        day3List.forEach( property => {
            props.push(property.val());
            return false;
        });
  
        this.day3List = props;
        this.loadedDay3List = props;
    });
  
  

}

  goToSessionDetail(session){
    let alert = this.alertCtrl.create({
      title: 'Session: '+session.brief,
      inputs: [
        {
          name: 'question',
          placeholder: 'Question',
          type: 'text'
        },{
          name: 'name',
          placeholder: 'Your Name',
          type: 'text'
        }
      
      ],
      buttons: [{
        text: 'OK',
        handler: data => {
          console.log('Saved clicked'+ data.question);
          
          this.saveQuestion(data.question, session.brief, data.name)
        }
      }]
    });
    // now present the alert on top of all other content
    alert.present();
  }

saveQuestion(question,sessionname, name){
  if (question == null) {
    this.die()
  } else {
  Promise.resolve(this.quest.push
    ({       sessionname: sessionname,
        timestamp: this.timestamp,
        question: question,
        name: name,
        owner: (JSON.parse(localStorage.getItem('ictemail')))
    })
    )}
}

die(){

}

ionViewDidLoad() {
  console.log('ionViewDidLoad QuestionsPage');
}
}
