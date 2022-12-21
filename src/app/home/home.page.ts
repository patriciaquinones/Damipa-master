import { Component, ElementRef, ENVIRONMENT_INITIALIZER, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { AppointmentService } from './../shared/appointment.service';
import { Appointment } from '../shared/Appointment';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  Bookings = [];

  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  
  markerId: string;
  

  constructor(private aptService:AppointmentService)  {}

  ngOnInit() {

    this.fetchBookings();
    let bookingRes = this.aptService.getBookingList();
    bookingRes.snapshotChanges().subscribe(res => {
      this.Bookings = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Bookings.push(a as Appointment);

    
  })
  })
  }

  fetchBookings() {
    this.aptService.getBookingList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  deleteBooking(id) {
    console.log(id)
    if (window.confirm('Do you really want to delete?')) {
      this.aptService.deleteBooking(id)
    }
  }


  ngAfterViewInit() {
    this.createMap();
  }
  
  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'capacitor-google-maps',
      element: this.mapRef.nativeElement,
      apiKey: environment.google_maps_api_key,
      config: {
        center: {
          lat: 18.4928637, 
          lng: -69.85129364787448,
        },
        zoom: 13,
      },
    });
    this.addMarker( 18.4928637, -69.85129364787448);
  } 

  async addMarker(lat: number, lng: number) {
    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng,
      },
      draggable: true,
    });
  }
}



