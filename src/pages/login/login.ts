import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { SignupPage } from '../signup/signup';

import { HomePage } from '../home/home';
import { CommonProvider } from "../../providers/common/common";
import { TabsPage } from '../tabs/tabs';
import { Events } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  resposeData : any;
  isorder : boolean;
  loadingtext : any;
  news: any[];
  userData = {"phone":"", "password":""};
  //userData = {"phone":"0911111111111111", "password":"mugmugmug"};

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, private toastCtrl:ToastController,public common: CommonProvider,public events: Events) {
  }

  ionViewDidLoad() {
    this.getNews();
    const data = JSON.parse(localStorage.getItem("userData"));
    if(data!=null){
      this.navCtrl.setRoot(HomePage);
    }
    console.log(data)
  }



  ionViewWillEnter(){
    const data = JSON.parse(localStorage.getItem("userData"));

    if(data!=null){
      this.navCtrl.setRoot(HomePage);
    }
  } 

  login(){
   if(this.userData.phone && this.userData.password){
    let body = new FormData();
    body.append('phone', this.userData.phone);
    body.append('password', this.userData.password);
    this.common.presentLoading();
    this.authService.postData(body, "user/login").then((result) =>{
    this.resposeData = result;
    this.common.closeLoading();

   
  
  

   
    if(this.resposeData.response){
      localStorage.setItem('userData', JSON.stringify(this.resposeData) );

      this.common.presentToast("تم تسجيل الدخول بنجاح");
      this.navCtrl.setRoot(TabsPage);

      this.events.publish('user:updatemenu', 'hi');


    }
    else{
      this.common.presentToast("خطأ في رقم الهاتف أو كلمة المرور");

    }
    


    }, (err) => {
      //Connection failed message
           console.log(err);
      this.common.closeLoading();
    });
   }
   else{
    this.presentToast("Give username and password");
   }
  
  }







  getNews(){
 
    this.common.presentLoading();


    this.authService.getData( "news").then((result) =>{
    this.resposeData = result;
    this.news=this.resposeData.data;
      
  //   if(this.news.length!=0){
  //       this.isorder=true
    
  //   } 
  //  if(this.orders.length==0){
  //       this.loadingtext="لا توجد عروض";

  //   }
    console.log(this.news)
    this.common.closeLoading();






  
  

   
    


    }, (err) => {
      //Connection failed message
           console.log(err);
      this.common.closeLoading();
    });
   }
  
  




  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  openreg(){

    this.navCtrl.push(SignupPage);

  }


}
