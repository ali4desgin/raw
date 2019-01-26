import { NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { OffersPage } from '../offers/offers';
import { OfferPage } from '../offer/offer';
import { LoginPage } from '../login/login';
import { ListPage } from '../list/list';
import { AboutUsPage } from './../about-us/about-us';
import { ContactUsPage } from './../contact-us/contact-us';




@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  home:any=0;
  

  tab1Root :any;
  tab2Root = ContactUsPage;
  tab3Root = OffersPage;
  tab4Root = AboutUsPage;

  constructor(public param:NavParams) {
    

    const data = JSON.parse(localStorage.getItem("userData"));
    console.log(data)

    if(data==null){

      this.tab1Root = LoginPage;

    }

    else{
      
      // if(this.param.get("tab")=="offers"){
      //   this.tab1Root = OffersPage;
      // }else{
      //   this.tab1Root = HomePage;
      // }
      this.tab1Root = HomePage;
    }

  
      // user and time are the same arguments passed in `events.publish(user, time)`
    
   

  }
}
