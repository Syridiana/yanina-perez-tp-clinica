import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ClassSelectorDirective } from 'src/app/Directives/class-selector.directive';
import HorarioI from 'src/app/Entities/horario-interface';
import { UserI } from 'src/app/Entities/user-interface';
import { AppointmentsService } from 'src/app/Services/appointments.service';
import { SpinnerService } from 'src/app/Services/spinner.service';
import { UserFirestoreService } from 'src/app/Services/user-firestore.service';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public currentUserEmail: any;
  public currentUserName!: any | null;
  public currentUser!: any | null;
  public currentUserHorario: any | null;
  public currentUserLastName!: any | null;
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

    this.afauth.onAuthStateChanged((user) => {
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

        localStorage.setItem('currentUserType', this.userType);
      })


    })

    this.userFirestoreService.getUsers().subscribe(users => {
      this.usersArray = users;
      this.spinnerService.hide();
    })


    this.appService.getHorarios().subscribe(horarios => {
      this.horariosArray = horarios;
      this.currentUserHorario = this.horariosArray?.find(u => u.emailDoctor === this.currentUserEmail);

      this.currentUserConfirmedAgenda = this.currentUserHorario.agenda;

      for (let item in this.currentUserHorario.agenda) {

        this.sorted = Object.keys(this.currentUserHorario.agenda[item])
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
        console.log(this.currentUserHorario) 
    /*     let day = e.target.parentNode.className;
    
        if (e.target.classList.contains('selected')) {
          this.currentUserHorario.agenda[`${day}`].push(e.target.textContent);
        } else {
          this.currentUserHorario.agenda[`${day}`] = this.currentUserHorario.agenda[`${day}`].filter(function (item: any) {
            return item !== e.target.textContent;
          })
    
        } */

  }


}
