import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the ChatbotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var ApiAIPromises: any;

@Component({
  selector: 'page-chatbot',
  templateUrl: 'chatbot.html',
})
export class ChatbotPage {

  answer;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform, 
    private ngZone: NgZone) {
  
    platform.ready().then(() => {
      ApiAIPromises.init({
        clientAccessToken: "4a516d6372dd43b086f0cf582b3a8e90"
      }).then(result => console.log(result));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatbotPage');
  }

  ask(question) {
    ApiAIPromises.requestText({
      query: question
    })
    .then(({result: {fulfillment: {speech}}}) => {
       this.ngZone.run(()=> {
         this.answer = speech;
       });
    })
  }

}
