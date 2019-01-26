import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CalcPage } from './../pages/calc/calc';
import { OffersPage } from '../pages/offers/offers';
import { Events } from 'ionic-angular';
import { NewOrdersPage } from '../pages/new-orders/new-orders';
// import { OneSignal, OneSignalOriginal } from '@ionic-native/onesignal';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;




 
  data: any;

  rootPage: any;

  userinfo = {
   "user":"Thank you ",
   "firstletter":"T",
   "loggedin":false,
   "isAdmin":''

    };


  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public events: Events) {
      //public alertCtrl: AlertController
      //,private oneSignal: OneSignalOriginal
    this.initializeApp();



    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'تسجيل الخروج', component: HomePage }
    ];


    events.subscribe('user:updatemenu', ( time) => {
      
      this.data = JSON.parse(localStorage.getItem("userData"));

      
    
        
      if(this.data!=null) {
    
        this.userinfo.user=this.data.user.username;
        this.userinfo.isAdmin=this.data.user.isAdmin;
        this.userinfo.firstletter=this.data.user.username.charAt(0).toUpperCase();
        this.userinfo.loggedin=true
      // user can user this.nav.setRoot(TutorialPage);
    //  this.initPushNotification();
    }
    });
    
  }

  initPushNotification(){
    // this.oneSignal.startInit('5431e437-b207-48d0-925f-233a774bb485', '159237662805');

    // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
    // this.oneSignal.handleNotificationReceived().subscribe(() => {
    //  // do something when notification is received
    // });
    
    // this.oneSignal.handleNotificationOpened().subscribe(() => {
    //   // do something when a notification is opened
    // });
    
    // this.oneSignal.endInit();

  }




  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.


       this.data = JSON.parse(localStorage.getItem("userData"));

    
    
        
      if(this.data) {
        this.userinfo.isAdmin=this.data.user.isAdmin;
        this.userinfo.user=this.data.user.username;
        this.userinfo.firstletter=this.data.user.username.charAt(0).toUpperCase();
        this.userinfo.loggedin=true
        this.rootPage = TabsPage; // user can user this.nav.setRoot(TutorialPage);
    }else{
        this.rootPage = TabsPage; // user can user this.nav.setRoot(LoginPage);
    }

      this.splashScreen.hide();


    //   var getPlayerIdCallback = function (response){
       
    //     localStorage.setItem('id', JSON.stringify(response.userId));
       
    //   }
    //   var notificationOpenedCallback = function(jsonData) {

    //    const id=jsonData.notification.payload.additionalData.foo;
    //   //  that.nav.push(ResponsePage, {
    //   //   item:id,
    //   //   user:that.userPostData.user_id
    // //  });
    //   };

    //     window["plugins"].OneSignal.getIds(getPlayerIdCallback);
    //   window["plugins"].OneSignal
    //   .startInit("31ef1509-d097-4837-88c3-508d7a8c64b7", "846146650541")
    //   .handleNotificationOpened(notificationOpenedCallback)
    //   .endInit();

     this.statusBar.overlaysWebView(false);

// set status bar to white
    this.statusBar.backgroundColorByHexString('#000000');
  
     
   
      this.platform.setDir("rtl",true);

    });
  }

  logout(){
    //Api Token Logout 
    
  
    localStorage.removeItem("userData")
    
      this.userinfo.user="تم تسجيل الخروج"
      this.userinfo.loggedin=false
      this.userinfo.firstletter="R"

    this.nav.setRoot(TabsPage);
}




myorders(){
  this.nav.setRoot(TabsPage);
}


viewNewOrders(){
  this.nav.push(NewOrdersPage);
}




createOrder(){
  
  //this.nav.push(TabsPage , {tab:"offers"});
 this.nav.push(OffersPage);
}

calc(){
  this.nav.push(CalcPage);
}

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
