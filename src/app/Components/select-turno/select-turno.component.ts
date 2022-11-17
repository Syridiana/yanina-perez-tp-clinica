import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { idToken } from '@angular/fire/auth';
import HorarioI from 'src/app/Entities/horario-interface';
import { UserI } from 'src/app/Entities/user-interface';
import { AppointmentsService } from 'src/app/Services/appointments.service';
import { SpinnerService } from 'src/app/Services/spinner.service';
import { UserFirestoreService } from 'src/app/Services/user-firestore.service';
import { Timestamp } from "@angular/fire/firestore";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-select-turno',
  templateUrl: './select-turno.component.html',
  styleUrls: ['./select-turno.component.css']
})
export class SelectTurnoComponent implements OnInit {
  @Input() doctorEmail: any;
  @Input() doctorFullName: any;
  @Input() specialty: any;
  @Input() selectedUserEmail: any;
  @Input() selectedUserFullName: any;
  public currentUserHorario: any | null;
  currentUser: any | null;
  currentUserEmail: any | null;
  currentUserName: any | null;
  currentUserLastName: any | null;
  public userType: string | any;
  usersArray: UserI[] | undefined;
  horariosArray: HorarioI[] | undefined;
  lunes: any;
  martes: any;
  miercoles: any;
  jueves: any;
  viernes: any;
  sabado: any;
  sorted: any;
  apps: Array<any> = [];
  currentSchedule: Array<any> = [];
  appsTaken: Array<any> = [];


  currentUserConfirmedAgenda: any | undefined;


  constructor(private userFirestoreService: UserFirestoreService, private appService: AppointmentsService,
    private spinnerService: SpinnerService, private angularFireAuth: AngularFireAuth) {
    this.spinnerService.show();

    this.angularFireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserEmail = user.email;
      } else {
        this.currentUserEmail = "";
        this.userType = "";
      }
      this.userFirestoreService.getUsers().subscribe(users => {
        this.usersArray = users;
        this.currentUser = this.usersArray?.find(u => u.email === this.currentUserEmail);
        this.userType = this.currentUser?.type;
        this.currentUserName = this.currentUser?.name;
        this.currentUserLastName = this.currentUser?.lastName;
      })


    })

    this.appService.getHorarios().subscribe(horarios => {
      this.horariosArray = horarios;

      this.spinnerService.hide();
    })

    this.appService.getAppointments().subscribe(apps => {
      this.appsTaken = apps;


      if (this.doctorEmail) {
        this.makeAgenda();
      }
    })

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.doctorEmail) {
      this.makeAgenda();
    }
  }

  ngOnInit(): void {
  }



  makeAgenda() {
    this.currentSchedule = [];
    let date = new Date();

    for (let i = 0; i < 15; i++) {
      date.setDate(date.getDate() + 1);
      let weekDAy = date.toLocaleString('es-ES', { weekday: 'long' }).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      let horarios = this.horariosArray?.find(u => u.emailDoctor === this.doctorEmail);

      if (horarios) {
        let weekDayAgenda = horarios.agenda[`${weekDAy}`];

        if (weekDayAgenda) {
          Object.entries(weekDayAgenda).forEach(([key, value], index) => {
            if (value) {
              let newDate = new Date(date.setHours(parseInt(key), 0, 0))
              if (!this.appsTaken.find(u => u.date.toDate().toString() == newDate.toString())) {
                this.currentSchedule.push({ 'date': newDate, 'hour': key })
              }
            }
          });
        }

      }

    }

  }

  selectApp(app: any) {
    let newTurno;
    if(!(this.userType === 'admin')) {
      newTurno = {
        doctorEmail: this.doctorEmail,
        patientEmail: this.currentUserEmail,
        patientName: this.currentUserName + ' ' + this.currentUserLastName,
        doctorName: this.doctorFullName,
        date: app.date,
        specialty: this.specialty,
        state: 'pendiente',
        review: '',
        patientSurvey: '',
        patientQualification: '',
        doctorComments: '',
        doctorReview: '',
        diagnosis: '',
        adminComments: '',
      }

    } else {
      newTurno = {
        doctorEmail: this.doctorEmail,
        patientEmail: this.selectedUserEmail,
        patientName: this.selectedUserFullName,
        doctorName: this.doctorFullName,
        date: app.date,
        specialty: this.specialty,
        state: 'pendiente',
        review: '',
        patientSurvey: '',
        patientQualification: '',
        doctorComments: '',
        doctorReview: '',
        diagnosis: '',
        adminComments: '',
      }
    }


    try {
      this.appService.addTurno(newTurno);
      Swal.fire({
        title: 'Éxito!',
        text: 'Turno tomado con éxito',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        background: "#00af00",
        iconColor: "#fff",
        color: "#fff"
      })
     }
    catch (e: any) {
      Swal.fire({
        title: 'Error!',
        text: e.message,
        icon: 'error',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        background: "#ff3030",
        iconColor: "#fff",
        color: "#fff"
      })
    }
  }
}


