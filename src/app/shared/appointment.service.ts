import { Injectable } from '@angular/core';
import { Appointment } from '../shared/Appointment';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}
  // Create
  createBooking(apt: Appointment) {
    return this.bookingListRef.push({
      nombre: apt.nombre,
      email: apt.email,
      telefono: apt.telefono,
      fecha: apt.fecha,
      hora: apt.hora,
      cedula: apt.cedula,
      personas: apt.personas,
    

    });
  }
  // Get Single
  getBooking(id: string) {
    this.bookingRef = this.db.object('/appointment/' + id);
    return this.bookingRef;
  }
  // Get List
  getBookingList() {
    this.bookingListRef = this.db.list('/appointment');
    return this.bookingListRef;
  }
  // Update
  updateBooking(id, apt: Appointment) {
    return this.bookingRef.update({
      nombre: apt.nombre,
      email: apt.email,
      telefono: apt.telefono,
      fecha: apt.fecha,
      hora: apt.hora,
      cedula: apt.cedula,
      personas: apt.personas,
    });
  }
  // Delete
  deleteBooking(id: string) {
    this.bookingRef = this.db.object('/appointment/' + id);
    this.bookingRef.remove();
  }
}