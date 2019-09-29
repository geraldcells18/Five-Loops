import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { HttpModule } from '@angular/http';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public Agriculture: boolean = false;
  public ArchitectureAndDesign: boolean = false;
  public Business: boolean = false;
  data:any = {};
 
  
 
  constructor(public httpClient: HttpClient,private http: Http,public alertController: AlertController)
  {

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      message: 'SOS Sent to nearby people and police stations!',
      buttons: ['OK']
    });

    await alert.present();
  }

  showHideAgriculture()
  {
    this.Agriculture = !this.Agriculture;
    this.sendPostRequest();
    
  }

  showHideArchitecture()
  {
    this.ArchitectureAndDesign = !this.ArchitectureAndDesign;
  }
  showHideBusiness()
  {
    this.Business =!this.Business;
  }

  ngOnInit()
  {

  }

  sendPostRequest() {
    console.log("Sent!");

    this.presentAlert();
    var link = 'https://stioasys.com/oasys/js/demo/api/sendSMS.php';
    var myData = JSON.stringify({lat: 14.536892, long: 120.9805033});
    this.http.post(link, myData)
    .subscribe(data => {
    this.data.response = data["_body"]; 
     }, error => {
    console.log("Oooops!");
    });
  }


}
