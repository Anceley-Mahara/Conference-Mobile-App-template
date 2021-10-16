import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { ComingUpPage } from '../pages/coming-up/coming-up';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { PastEventsPage } from '../pages/past-events/past-events';
import { OngoingPage } from '../pages/ongoing/ongoing';
import { NewsPage } from '../pages/news/news';
import { CompetitionsPage } from '../pages/competitions/competitions';
import { VotePage } from '../pages/vote/vote';
import { ActionPage } from '../pages/action/action';
import { SponsorsPage } from '../pages/sponsors/sponsors';
import { ExhibitorsPage } from '../pages/exhibitors/exhibitors';
import { QuestionsPage } from '../pages/questions/questions';
import { NoticeBoardPage } from '../pages/notice-board/notice-board';
import { ChatbotPage } from '../pages/chatbot/chatbot';
import { RegisterPage } from '../pages/register/register';
import { ScanAttendancePage } from '../pages/scan-attendance/scan-attendance';
import { ScanPage } from '../pages/scan/scan';
import { HelpPage } from '../pages/help/help';
import { SchedulePage } from '../pages/schedule/schedule';
import { VideosPage } from '../pages/videos/videos';

@Component({
  templateUrl: 'app.html'
})
export class MyApp { 
   @ViewChild(Nav) nav: Nav;
  rootPage:any = OngoingPage;
  activePage: any;
  email:any;


    pagesAccount:Array<{title:string, component:any, icon:any, color:any}>;
    pagesEvent:Array<{title:string, component:any, icon:any, color:any}>;
    pagesActivity:Array<{title:string, component:any, icon:any, color:any}>;
    pagesAnnouncement:Array<{title:string, component:any, icon:any, color:any}>;
    pagesAboutUs:Array<{title:string, component:any, icon:any, color:any}>;
    pagesAdmin:Array<{title:string, component:any, icon:any, color:any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.email=localStorage.getItem('ictemail');

    this.pagesEvent = [
        { title: 'Coming Up', component: ComingUpPage, icon: 'fastforward', color:'ict-blue' },
        { title: 'Current Events', component: OngoingPage, icon: 'git-compare', color:'ict-blue' },
        { title: 'Past Events', component: PastEventsPage, icon: 'rewind', color:'ict-blue' }
    ];

    this.pagesActivity = [
        { title: 'News/Media', component: NewsPage, icon: 'md-paper', color:'ict-green' },
    //    { title: 'Schedules', component: SchedulePage, icon: 'md-calendar', color:'ict-green' },
        { title: 'Competitions', component: CompetitionsPage, icon: 'md-trophy', color:'ict-green' },
        { title: 'Action Items', component: ActionPage, icon: 'done-all', color:'ict-green' }
    ];

    this.pagesAnnouncement = [
        { title: 'Notice Board', component: NoticeBoardPage, icon: 'notifications', color:'ict-red' },
        { title: 'Questions Submitted', component: QuestionsPage, icon: 'md-help', color:'ict-red' },
        { title: 'Broadcasting', component: VideosPage, icon: 'md-videocam', color:'ict-red' },
        { title: 'Programme', component: SchedulePage, icon: 'md-calendar', color:'ict-red' },
    
    ];

    this.pagesAboutUs = [
        { title: 'About the Summit', component: AboutPage, icon: 'md-information-circle', color:'ict-yellow' },
        { title: 'Sponsors', component: SponsorsPage, icon: 'contacts', color:'ict-yellow' },
        { title: 'Exhibitors', component: ExhibitorsPage, icon: 'easel', color:'ict-yellow' },
        { title: 'Programme', component: SchedulePage, icon: 'md-calendar', color:'ict-yellow' },
        { title: 'Chatbot', component: ChatbotPage, icon: 'md-chatboxes', color:'ict-yellow' },
        { title: 'Vote', component: VotePage, icon: 'md-thumbs-up', color:'ict-yellow' },
        { title: 'Contact Details', component: ContactPage, icon: 'call', color:'ict-yellow' }
    ];

    this.pagesAccount = [
        { title: 'Login', component: LoginPage, icon: 'log-in', color:'ict-red'  },
        { title: 'Register', component: RegisterPage, icon: 'md-clipboard', color:'ict-red'  },
        { title: 'Help', component: HelpPage, icon: 'md-help-circle', color:'ict-red'  }
    ];

    this.pagesAdmin = [
        { title: 'Converse', component: ScanPage, icon: 'md-barcode', color:'ictblue' }
    ];

    if (localStorage.getItem('ictadmin') !== null) {
        this.pagesAdmin = [
            { title: 'ScanAttendance', component: ScanAttendancePage, icon: 'md-barcode', color:'ictblue' }
        ];
    } else {
    
    }

    this.activePage = this.pagesEvent[0]

}
openPage(page) {
// Reset the content nav to have just this page
// we wouldn't want the back button to show in this scenario
this.nav.setRoot(page.component);
this.activePage = page;

  }

  checkActive(page){
    return page == this.activePage;
  }


}
