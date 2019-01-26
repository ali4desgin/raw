import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { CommonProvider } from "../../providers/common/common";
import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  resposeData : any;
  userData = {"usename":"","phone":"", "password":""};

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, private toastCtrl:ToastController,public common: CommonProvider,public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }



  ionViewWillEnter(){
    const data = JSON.parse(localStorage.getItem("userData"));

    if(data!=null){
      this.navCtrl.setRoot(HomePage);
    }
  } 


  
  register(){

   if(this.userData.phone && this.userData.password&&this.userData.usename){
    this.common.presentLoading();

    let data="";
        if(localStorage.getItem("id")!=null){
        
       data = JSON.parse(localStorage.getItem("id"));
            
     

    }
    let body = new FormData();
    body.append('username', this.userData.usename);
    body.append('phone', this.userData.phone);
    body.append('password', this.userData.password);
    body.append('not_id', data);
    this.authService.postData(body, "user/register").then((result) =>{
    this.resposeData = result;

    console.log(this.resposeData.response)
   
    this.common.closeLoading();
   
    if(this.resposeData.response){
  

      this.common.presentToast("تم التسجيل  بنجاح");

       this.login();

      


    }
    else if(!this.resposeData.response){
      this.common.presentToast(this.resposeData.message);

    }
   
    


    }, (err) => {
                  this.common.closeLoading();
    });
   }
   else{
    this.presentToast("Give username and password");
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
       this.events.publish('user:updatemenu', 'hi');
       this.common.presentToast("تم تسجيل الدخول بنجاح");
       this.navCtrl.setRoot(HomePage , { reload : true });
       
       
 
 
 
     }
     else{
       this.common.presentToast("خطأ في أسم المستخدم أو كلمة المرور");
 
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

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

 

}
