import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import Leaflet from 'leaflet';
import 'leaflet-routing-machine';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';
import 'leaflet-control-geocoder';
import { AlertController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


declare var L: any;

var lng = 0;
var lat = 0;
var latlng = 0;
var nearbylatlng=0;
var PointA_lat = 14.536892;
var PointA_lng = 120.9805033;
var PointB_lat = 14.5427324;
var PointB_lng = 120.9886713;
var nearbylatlng2;
var nearbylatlng3;
var nearbylatlng4;
var nearbylatlng5;
var nearbylatlng6;
var nearbylatlng7;
var nearbylatlng8;
var marker;
var marker2;
var ambulance1;
var policeStation;
var mymap;
var showPolice=false;
var showAmbulance=false;
var helpmarker;
var policeMan;
var fireMarker;
var thiefMarker;

var tao = L.icon({
  iconUrl: '/assets/icon/tao.jpg',

  iconSize:     [50, 50], 
  shadowSize:   [50, 64], 
  popupAnchor:  [-3, -20] 
});
var police = L.icon({
  iconUrl: '/assets/icon/policecar.png',

  iconSize:     [50, 50], 
  shadowSize:   [50, 64], 
  popupAnchor:  [-3, -20] 
});
var ambulance = L.icon({
  iconUrl: '/assets/icon/ambulance.png',

  iconSize:     [50, 50], 
  shadowSize:   [50, 64], 
  popupAnchor:  [-3, -20] 
});
var policeStation = L.icon({
  iconUrl: '/assets/icon/station.png',

  iconSize:     [50, 50], 
  shadowSize:   [50, 64], 
  popupAnchor:  [-3, -20] 
});

var hospitalStation = L.icon({
  iconUrl: '/assets/img/hospital.png',

  iconSize:     [50, 50], 
  shadowSize:   [50, 64], 
  popupAnchor:  [-3, -20] 
});
var help = L.icon({
  iconUrl: '/assets/icon/help.png',

  iconSize:     [50, 50], 
  shadowSize:   [50, 64], 
  popupAnchor:  [-3, -20] 
});
var pulis = L.icon({
  iconUrl: '/assets/icon/police.jpg',

  iconSize:     [50, 50], 
  shadowSize:   [50, 64], 
  popupAnchor:  [-3, -20] 
});
var fire = L.icon({
  iconUrl: '/assets/icon/fire.png',

  iconSize:     [50, 50], 
  shadowSize:   [50, 64], 
  popupAnchor:  [-3, -20] 
});
var thief = L.icon({
  iconUrl: '/assets/icon/robber.png',

  iconSize:     [50, 50], 
  shadowSize:   [50, 64], 
  popupAnchor:  [-3, -20] 
});
var showDirections: boolean = false;

var customPopup = "<img src='/assets/img/samplePhoto.jpg' width='500px' style='border-radius:50%;'/><br/><p style='overflow:hidden; white-space: nowrap; text-overflow:clip;'><ion-icon name='contact'></ion-icon><b> Name:</b> Nath Daaco<br/><ion-icon name='build'></ion-icon><b> Occupation:</b> Doctor<br/><ion-icon name='call'></ion-icon><b> Contact:</b> 09270444860 </p>";
var customPopup2 = "<img src='/assets/img/mnl.png' width='500px' style='border-radius:50%;'/><br/><p style='overflow:hidden; white-space: nowrap; text-overflow:clip;'><ion-icon name='contact'></ion-icon><b> Name:</b> Police1<br/><ion-icon name='build'></ion-icon><b> Status:</b> On Duty<br/><ion-icon name='call'></ion-icon><b> Contact:</b> 09123456789 <br/><ion-button href='/chat-room'>Contact Me</ion-button></p>";
var customPopup3 ="<p style='overflow:hidden; white-space: nowrap; text-overflow:clip;'><ion-icon name='contact'></ion-icon><b> Name:</b>Precinct 4<br/><ion-icon name='build'></ion-icon><b>Police On Duty:</b>5<br/><ion-icon name='call'></ion-icon><b> Contact:</b> 092323232 <br/><ion-button href='/chat-room'>Contact</ion-button></p>"; 
var ambulancePopup="<img src='/assets/icon/paramedic.jpg' width='500px' style='border-radius:50%;'/> <p style='overflow:hidden; white-space: nowrap; text-overflow:clip;'><ion-icon name='contact'></ion-icon><b> Name:</b>Ambulance<br/><ion-icon name='build'></ion-icon><b>Status:</b>On Duty<br/><ion-icon name='call'></ion-icon><b> Contact:</b> 092323232 <br/><ion-button href='/chat-room'>Contact</ion-button></p>"; 
// specify popup options 
var helpPopUp="<img src='/assets/icon/ongay.jpg' width='500px' style='border-radius:50%;'/><br/><p style='overflow:hidden; white-space: nowrap; text-overflow:clip;'><ion-icon name='contact'></ion-icon><b> Name:</b> Alvin Ongay<br/><ion-icon name='build'></ion-icon><b> Occupation:</b> LBC Dev<br/><ion-icon name='call'></ion-icon><b> Contact:</b> 092721313 </p></b><p>Emergency: Road Accident</p></a>";
var customPopup4 ="<p style='overflow:hidden; white-space: nowrap; text-overflow:clip;'><ion-icon name='contact'></ion-icon><b> Name:</b>Hospital 4<br/><ion-icon name='build'></ion-icon><b>Doctor On Duty:</b>10<br/><ion-icon name='call'></ion-icon><b> Contact:</b> 0912314443 <br/><ion-button href='/chat-room'>Contact</ion-button></p>"; 
var customPopup5="<img src='/assets/img/mnl.png' width='500px' style='border-radius:50%;'/><br/><p style='overflow:hidden; white-space: nowrap; text-overflow:clip;'><ion-icon name='contact'></ion-icon><b> Name:</b> Police1<br/><ion-icon name='build'></ion-icon><b> Status:</b> On Duty<br/><ion-icon name='call'></ion-icon><b> Contact:</b> 09123456789 <br/><ion-button href='/chat-room'>Contact Me</ion-button></p>";
var customPopup6="<img src='/assets/icon/fire.png' width='500px' style='border-radius:50%;'/><br/><p style='overflow:hidden; white-space: nowrap; text-overflow:clip;'><ion-icon name='contact'></ion-icon><b> Name:</b> Citizen 1<br/><ion-icon name='build'></ion-icon><b> Occupation:</b> Citizen<br/><ion-icon name='call'></ion-icon><b> Contact:</b> 092721313 </p></b><p>Emergency: Fire</p></a>";
var customPopup7="<img src='/assets/icon/robber.png' width='500px' style='border-radius:50%;'/><br/><p style='overflow:hidden; white-space: nowrap; text-overflow:clip;'><ion-icon name='contact'></ion-icon><b> Name:</b> Citizen 2<br/><ion-icon name='build'></ion-icon><b> Occupation:</b> Citizen<br/><ion-icon name='call'></ion-icon><b> Contact:</b> 092721313 </p></b><p>Emergency: Theft</p></a>";
var customOptions =
    {
    'maxWidth': 'auto',
    'minWidth': 'auto',
    'minHeight': 'auto',
    'maxHeight': 'auto'
    }
    var selectedLatlng;
    
   
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})

export class Tab3Page {
  // @ViewChild('map') mapContainer: ElementRef;
  map: any;
  regAs: any;
  showDirectionValue: boolean=true;
  constructor(public navCtrl: NavController,public alertController: AlertController,private localNotifications: LocalNotifications) {

  }
 
 

  ionViewDidEnter() {

     this.loadmap();
    //this.loadmapSearch();
    
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'SOS!',
      message: 'SOS Signal Sent To Nearby People and Police Station!.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertNew() {
    const alert = await this.alertController.create({
      header: 'SOS SIGNAL!',
      message: 'Someone fire a SOS Signal. You may want to check it out.',
      buttons: ['OK']
    });

    await alert.present();
  }

  sendSOS()
  {
    this.presentAlert();
    this.showNotif();
  }
 
showNotif()
{
  this.localNotifications.schedule({
    title: 'Someone May Need Your Help!',
    text: 'Want to check it out?',
    actions: [
        { id: 'yes', title: 'Yes' },
        { id: 'no',  title: 'No' }
    ],
});

this.localNotifications.on('yes').subscribe(notification => {
  this.presentAlert();
   });
}
  loadmap() {

    navigator.geolocation.getCurrentPosition(function(location)
    {
      mymap = Leaflet.map('map').setView([lat, lng], 18);  
      latlng = new L.LatLng(location.coords.latitude,location.coords.longitude);
      console.log(latlng);
      nearbylatlng=new L.LatLng(location.coords.latitude+0.000798,location.coords.longitude+0.004622);
      nearbylatlng2=new L.LatLng(location.coords.latitude+0.000598,location.coords.longitude+0.002622);
      nearbylatlng3 = new L.LatLng(location.coords.latitude+0.000298,location.coords.longitude+0.003622);
      nearbylatlng4 = new L.LatLng(location.coords.latitude+0.02356,location.coords.longitude+0.009622);
      nearbylatlng5 = new L.LatLng(location.coords.latitude+0.006298,location.coords.longitude+0.002622);
      nearbylatlng6 = new L.LatLng(location.coords.latitude+0.009398,location.coords.longitude+0.005622);
      nearbylatlng7 = new L.LatLng(location.coords.latitude+0.012368,location.coords.longitude+0.001622);
      nearbylatlng8 = new L.LatLng(location.coords.latitude+0.015368,location.coords.longitude+0.003622);
      // nearbylatlng4 = new L.LatLng(location.coords.latitude+0.002298,location.coords.longitude+0.002622);
      marker = Leaflet.marker(latlng,{icon: tao}).addTo(mymap).bindPopup(customPopup,customOptions);
      helpmarker = Leaflet.marker(nearbylatlng4,{icon: help}).addTo(mymap).on('click', function(e) {
        selectedLatlng=nearbylatlng4;
     }).bindPopup(helpPopUp,customOptions);
      policeStation= Leaflet.marker(nearbylatlng3,{icon: policeStation}).addTo(mymap).bindPopup(customPopup3,customOptions);
      hospitalStation = Leaflet.marker(nearbylatlng5,{icon: hospitalStation}).addTo(mymap).bindPopup(customPopup4,customOptions);
      policeMan = Leaflet.marker(nearbylatlng6,{icon: pulis}).addTo(mymap).bindPopup(customPopup5,customOptions);
      fireMarker=Leaflet.marker(nearbylatlng7,{icon: fire}).addTo(mymap).bindPopup(customPopup6,customOptions);
      thiefMarker=Leaflet.marker(nearbylatlng8,{icon: thief}).addTo(mymap).bindPopup(customPopup7,customOptions);
      Leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmF0aGRhYWNvNzgiLCJhIjoiY2p0ajE1dGVwMGlkMzQ5bWRhdXNzbHluMiJ9.zA0f7OVGLu_j_iQ9fetATw', {
        attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',  
      zoom: 8,
      maxZoom: 18,
      minZoom: 4,
      minResolution: 4891.96981025128,
      maxResolution: 39135.75848201024,
      doubleClickZoom: true,
      center: latlng
      }).addTo(mymap);
      mymap.panTo(latlng);
    });   
  }



  showNearbyPolice()
  {
    if(showPolice==false)
    {
      marker2= Leaflet.marker(nearbylatlng2,{icon: police}).addTo(mymap).bindPopup(customPopup2,customOptions);
      showPolice=true;
    }
    else{
      mymap.removeLayer(marker2);
      showPolice=false;
    }
    console.log(selectedLatlng);
  
  }

  showDirections()
  {
    var myDirection=Leaflet.Routing.control({
      
      waypoints: [
              Leaflet.latLng(latlng),
              Leaflet.latLng(selectedLatlng)
       ], 
      routeWhileDragging: true,  
      geocoder: Leaflet.Control.Geocoder.nominatim()
    }).addTo(mymap);
  }

  showNearbyAmbulance()
  {
    if(showAmbulance==false)
    {
      
      ambulance1= Leaflet.marker(nearbylatlng,{icon: ambulance}).addTo(mymap).bindPopup(ambulancePopup,customOptions);
      showAmbulance=true;
    }
    else{
      mymap.removeLayer(ambulance1);
      showAmbulance=false;
    }
  }

  showSelectValue(regAs)
{
  if(regAs=="NearbyPolice")
  {
    
    this.showNearbyPolice();
    
  }
  else{
    this.showNearbyAmbulance();
    
  }

}

  loadmapSearch()
  {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmF0aGRhYWNvNzgiLCJhIjoiY2p0ajE1dGVwMGlkMzQ5bWRhdXNzbHluMiJ9.zA0f7OVGLu_j_iQ9fetATw';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11/',  
    center: [-79.4512, 43.6568],
    zoom: 13

  });
  map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
    }));
  }
}
