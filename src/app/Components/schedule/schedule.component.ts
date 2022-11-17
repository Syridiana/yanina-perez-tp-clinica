import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import HorarioI from 'src/app/Entities/horario-interface';
import { UserI } from 'src/app/Entities/user-interface';
import { AppointmentsService } from 'src/app/Services/appointments.service';
import { SpinnerService } from 'src/app/Services/spinner.service';
import { UserFirestoreService } from 'src/app/Services/user-firestore.service';
import { AppointmentsComponent } from '../appointments/appointments.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Input() doctorEmail: any;
  public currentUserHorario: any | null;
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


  currentUserConfirmedAgenda: any | undefined;


  constructor(private afauth: AngularFireAuth,
    private userFirestoreService: UserFirestoreService, private appService: AppointmentsService,
    private el: ElementRef, private renderer: Renderer2, private spinnerService: SpinnerService) {
    this.spinnerService.show();
    
    this.appService.getHorarios().subscribe(horarios => {
      this.horariosArray = horarios;
      this.currentUserHorario = this.horariosArray?.find(u => u.emailDoctor === this.doctorEmail);

      this.currentUserConfirmedAgenda = this.currentUserHorario?.agenda;

      for (let item in this.currentUserHorario?.agenda) {

        this.sorted = Object.keys(this.currentUserHorario?.agenda[item])
          .sort()
          .reduce((accumulator: any, key) => {
            accumulator[key] = this.currentUserHorario.agenda[item][key];

            return accumulator;
          }, {});

        switch (item) {
          case 'lunes':
            this.lunes = this.sorted;
            break;
          case 'martes':
            this.martes = this.sorted;
            break;
          case 'miercoles':
            this.miercoles = this.sorted;
            break;
          case 'jueves':
            this.jueves = this.sorted;
            break;
          case 'viernes':
            this.viernes = this.sorted;
            break;
          case 'sabado':
            this.sabado = this.sorted;
            break;

        }
      }
      this.spinnerService.hide();
    })

  }



  ngOnInit(): void {
  }



  toggle(e: any) {
    e.target.classList.toggle("selected");
    let day = e.target.parentNode.parentNode.className;
    let hour = e.target.textContent;
    this.currentUserHorario.agenda[`${day}`][`${hour}`] = !this.currentUserHorario.agenda[`${day}`][`${hour}`];
    this.appService.updateAgenda(this.doctorEmail, this.currentUserHorario);
  }


}
