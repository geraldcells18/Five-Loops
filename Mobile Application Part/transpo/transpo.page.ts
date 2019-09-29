import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import Leaflet from 'leaflet';
import 'leaflet-routing-machine';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';
import 'leaflet-control-geocoder';


declare var L: any;
var lng = 0;
var lat = 0;
var latlng = 0;
var PointA_lat = 14.536892;
var PointA_lng = 120.9805033;
var PointB_lat = 14.5427324;
var PointB_lng = 120.9886713;
@Component({
  selector: 'app-transpo',
  templateUrl: 'transpo.page.html',
  styleUrls: ['transpo.page.scss'],
})

export class TranspoPage {
  // @ViewChild('map') mapContainer: ElementRef;
  map: any;
  constructor(public navCtrl: NavController) {

  }
 
  ionViewDidEnter() {

     this.loadmap();
    //this.loadmapSearch();
  }

  loadmap() {

    navigator.geolocation.getCurrentPosition(function(location)
    {
      var tao = L.icon({
        iconUrl: '/assets/icon/tao.jpg',
      
        iconSize:     [50, 50], 
        shadowSize:   [50, 64], 
        popupAnchor:  [-3, -20] 
      });
      var mymap = Leaflet.map('map').setView([lat, lng], 18);  
      latlng = new L.LatLng(location.coords.latitude,location.coords.longitude);
      console.log(latlng);
      var list = "<dt>Name:Nath Daaco</dt>"
           + "<dt>Occupation:Doctor</dt>";
         
      var marker = Leaflet.marker(latlng,{icon: tao}).addTo(mymap).bindPopup(list);
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
    
      Leaflet.Routing.control({
        waypoints: [
                // Leaflet.latLng(latlng),
        //      //Leaflet.latLng(PointB_lat, PointB_lng)
         ], 
        routeWhileDragging: true,  
        geocoder: Leaflet.Control.Geocoder.nominatim()
      }).addTo(mymap);
  
    });
   
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
