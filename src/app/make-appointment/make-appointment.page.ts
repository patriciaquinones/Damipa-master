import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppointmentService } from './../shared/appointment.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.page.html',
  styleUrls: ['./make-appointment.page.scss'],
})
export class MakeAppointmentPage implements OnInit {
  bookingForm: FormGroup;
  constructor(

    private alertController: AlertController,
    private aptService: AppointmentService,
    private router: Router,
    public fb: FormBuilder

  ) { }
  ngOnInit() {
    this.bookingForm = this.fb.group({
      nombre: [''],
      email: [''],
      telefono: [''],
      fecha: [''],
      hora: [''],
      cedula: [''],
      personas: [''],
    })
  }
  formSubmit() {
    if (!this.bookingForm.valid) {
      return false;
    } else {
      this.aptService.createBooking(this.bookingForm.value).then(res => {
        console.log(res)
        this.bookingForm.reset();
        this.router.navigate(['/dashboard']);
      })
        .catch(error => console.log(error));
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'Reservacion realizada con exito',
      buttons: ['OK'],
    });

    await alert.present();
  }

}

