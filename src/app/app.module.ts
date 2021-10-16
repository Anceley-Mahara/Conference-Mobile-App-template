import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ComingUpPage } from '../pages/coming-up/coming-up';
import { OngoingPage } from '../pages/ongoing/ongoing';
import { PastEventsPage } from '../pages/past-events/past-events';
import { FacebookvideosPipe} from '../pipes/facebookvideos/facebookvideos';

import { NewsPage } from '../pages/news/news';
import { CompetitionsPage } from '../pages/competitions/competitions';
import { SocialPage } from '../pages/social/social';
import { ActionPage } from '../pages/action/action';
import { SponsorsPage } from '../pages/sponsors/sponsors';
import { ExhibitorsPage } from '../pages/exhibitors/exhibitors';
import { SupportPage } from '../pages/support/support';
import { VotePage } from '../pages/vote/vote';
import { RegisterPage } from '../pages/register/register';
import { NoticeBoardPage } from '../pages/notice-board/notice-board';
import { FirebaseDetail} from '../pages/firebase-detail/firebase-detail';
import { ChatbotPage } from '../pages/chatbot/chatbot';
import { LoginPage } from '../pages/login/login';
import { ScanPage } from '../pages/scan/scan';
import { HelpPage } from '../pages/help/help';
import { QuestionsPage } from '../pages/questions/questions';
import { SchedulePage } from '../pages/schedule/schedule';
import { VideosPage } from '../pages/videos/videos';
import { FeedbackPage } from '../pages/feedback/feedback';
import { LivePage } from '../pages/live/live';
import { SponsorDetailPage } from '../pages/sponsor-detail/sponsor-detail';
import { ScanAttendancePage } from '../pages/scan-attendance/scan-attendance';

import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { ImagePicker } from '@ionic-native/image-picker';
//import { IonicImageViewerModule } from 'ionic-img-viewer';

//import { NgxQRCodeModule} from 'ngx-qrcode2';
import { BarcodeScanner} from '@ionic-native/barcode-scanner';

import { SMS } from '@ionic-native/sms';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule }from 'angularfire2';
//import { Facebook } from '@ionic-native/facebook';
import { SocialSharing } from '@ionic-native/social-sharing';

import {enableProdMode} from '@angular/core';
enableProdMode();

var config = {
  apiKey: "AIzaSyDjh5LaGAMA9tsrKKYJgRyQ7k9Uwd58L2k",
  authDomain: "ictsummit-af35b.firebaseapp.com",
  databaseURL: "https://ictsummit-af35b.firebaseio.com",
  projectId: "ictsummit-af35b",
  storageBucket: "",
  messagingSenderId: "904951502575"
};

@NgModule({
  declarations: [
    MyApp,FacebookvideosPipe,FeedbackPage,LivePage,
    AboutPage,ChatbotPage,LoginPage,ScanPage,SchedulePage,
    ContactPage,PastEventsPage,RegisterPage,HelpPage,SponsorDetailPage,
    ComingUpPage,VotePage,FirebaseDetail,ScanAttendancePage,
    HomePage,OngoingPage,NoticeBoardPage,QuestionsPage,VideosPage,
    TabsPage,NewsPage,CompetitionsPage,SocialPage,ActionPage,SponsorsPage,ExhibitorsPage,SupportPage

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,VotePage,FirebaseDetail,ChatbotPage,SchedulePage,SponsorDetailPage,
    ContactPage,OngoingPage,LoginPage,ScanPage,HelpPage,FeedbackPage,LivePage,
    ComingUpPage,PastEventsPage,RegisterPage,ScanAttendancePage,
    HomePage,NoticeBoardPage,QuestionsPage,VideosPage,
    TabsPage,NewsPage,CompetitionsPage,SocialPage,ActionPage,SponsorsPage,
    ExhibitorsPage,SupportPage
  ],
  providers: [
    StatusBar,AngularFireAuth,
    SplashScreen,SMS//,Facebook
    ,SocialSharing,Camera,ImagePicker, Crop,BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
