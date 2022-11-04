import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TurnoI } from 'src/app/Entities/turno-interface';
import { AppointmentsService } from 'src/app/Services/appointments.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  currentUser: any;
  currentUserEmail: any;
  appList: TurnoI[] | undefined;
  userAppList: TurnoI[] = [];
  currentUserLastName: any;
  currentUserName: any;
  currentUserType: any;
  filterDoctor: string = '';
  filterPatient: string = '';
  filterSpecialty: string = '';

  constructor(private appSvc: AppointmentsService, private angularFireAuth: AngularFireAuth) {

    this.angularFireAuth.onAuthStateChanged((user) => {
      this.currentUserType = localStorage.getItem('currentUserType');
      if (user) {
        this.currentUserEmail = user.email;
      }
      this.appSvc.getAppointments().subscribe(apps => {
        this.appList = apps;
        if (this.currentUserType == 'admin') {
          this.userAppList = apps;
        } else {
          this.userAppList = this.appList?.filter(u => u.doctorEmail === this.currentUserEmail);
          if (this.userAppList.length < 1) {
            this.userAppList = this.appList?.filter(u => u.patientEmail === this.currentUserEmail);
          }
        }
      })

    })
  }

  ngOnInit(): void {
  }

  async cancel(e: any) {
    let appUid = e.target.getAttribute('data-appointment-uid');
    /*     this.appSvc.changeAppointmentState(appUid, 'cancelado'); */

    const { value: comment } = await Swal.fire({
      title: 'Debe dejar un comentario para cancelar el turno',
      input: 'text',
      confirmButtonText: 'Enviar'
    })

    if (comment) {
      this.appSvc.changeAppointmentState(appUid, 'cancelado');
      this.appSvc.addComment(appUid, `Cancelado por ${this.currentUserType}: ${comment}`);
    }
  }


  showReview(e: any) {
    let appUid = e.target.getAttribute('data-appointment-uid');
    let appointment = this.appList?.find(u => u.uid === appUid);


    Swal.fire({
      title: 'Reseña',
      text: `${appointment?.review}`
    })

  }

  async qualify(e: any){
    let appUid = e.target.getAttribute('data-appointment-uid');
    let appointment = this.appList?.find(u => u.uid === appUid);


    const { value: qualifcation } = await Swal.fire({
      title: 'Califica la atencion',
      input: 'select',
      inputOptions: {
        'Nada satisfecho': 'Nada satisfecho',
        'Algo satisfecho': 'Algo satisfecho',
        'Muy satisfecho': 'Muy satisfecho'
      },
      inputPlaceholder: 'Seleccioná una opción',
      showCancelButton: true
    })
    
    if (qualifcation) {
      this.appSvc.addQualification(appUid, qualifcation);
    }
  }
}
