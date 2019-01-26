import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { SignupPage } from '../signup/signup';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HomePage } from '../home/home';
import { CommonProvider } from "../../providers/common/common";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  
})
export class ChatPage  {


  @ViewChild(Content) content: Content;


  resposeData : any;
  items : any;
  editorMsg : any;
  phone : any;
  messages: any[];
  haswhatsapp : boolean;

  isimage:boolean;
  public base64Image: string;

  constructor(private socialSharing: SocialSharing,public navCtrl: NavController, public authService: AuthServiceProvider, private toastCtrl:ToastController,public common: CommonProvider
  ,public navParams: NavParams,private camera: Camera) {

       this.haswhatsapp=true
       this.isimage=false

       const data = JSON.parse(localStorage.getItem("userData"));
     

       if(data.user.isAdmin=="yes"){
   
               this.haswhatsapp=false
   
       }
    this.items=this.navParams.get("item")
    console.log(this.items);
  }



  goToBottom(){
    
    let dimensions = this.content.getContentDimensions();
   // console.log("hight console.log(dimensions.scrollHeight);"+ dimensions.scrollHeight);
    this.content.scrollTo(0, 10000000,100);
  //
 }

 ionViewWillUnload(){
  this.goToBottom();
 }


  
  ionViewDidEnter() {
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0,10000000,100);
  }



  ionViewDidLoad() {
    this.getchat();
    //this.goToBottom();
  }

  
  // ionViewDidEnter(){
  //   this.content.scrollToBottom(300);//300ms animation speed
  // }



    openwhats(){
  

      console.log(this.phone)
      this.socialSharing.shareViaWhatsAppToReceiver(this.phone,"hello there im ").then(() => {
        // Sharing via email is possible
      }).catch(() => {
        // Sharing via email is not possible
      });
  
     }

  

  getchat(){
  
 


    let body =  "chats/list?order_id=" +this.navParams.get("item").id ;
    this.common.presentLoading();
    this.authService.getData(body).then((result) =>{
    this.resposeData = result;
    this.messages=this.resposeData.data;
    this.common.closeLoading();
    this.phone=this.resposeData.whatsapp

    this.goToBottom();
  

   
    
    


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

    this.navCtrl.setRoot(SignupPage);

  }


  ionViewWillEnter(){
    this.goToBottom();
  }


  opengallery(){




      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 450,
        targetHeight: 450,
        saveToPhotoAlbum: false,
        sourceType:0
      }
  
      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.base64Image=base64Image
  
        this.isimage=true
  
  
        console.log(imageData)
       }, (err) => {
        // Handle error
       });
  
    

  }



  sendMsg(){


    const data = JSON.parse(localStorage.getItem("userData"));
     

    if(data.user.isAdmin=="yes"){

            this.haswhatsapp=false

    }
    
      if(this.editorMsg!="" ){
       let body = new FormData();
       body.append('order_id', this.navParams.get("item").id);
       body.append('message', this.editorMsg);

       if(this.isimage){
        body.append('isImage', "yes");
        body.append('image',this.base64Image. split(',')[1]);
        this.isimage=false;

       }
       else {
        body.append('isImage', "no");
     

       }
      
       body.append('isAdmin', data.user.isAdmin);
       this.common.presentLoading();
       this.authService.postData(body, "chats/send_message").then((result) =>{
       this.resposeData = result;
       this.common.closeLoading();
   
   
           this.getchat();
           
   
     
       
   
   
       }, (err) => {
         //Connection failed message
              console.log(err);
         this.common.closeLoading();
       });
     
     
     


    this.editorMsg="";

    

  }
  }
  }
