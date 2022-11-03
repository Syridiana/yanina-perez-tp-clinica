import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TurnoI } from 'src/app/Entities/turno-interface';
import { AppointmentsService } from 'src/app/Services/appointments.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  currentUser: any;
  currentUserEmail: any;
  appList: TurnoI[] | undefined;
  userAppList: TurnoI[] | undefined;
  currentUserLastName: any;
  currentUserName: any;
  currentUserType: any;

  constructor(private appSvc: AppointmentsService, private angularFireAuth: AngularFireAuth) {

    this.angularFireAuth.onAuthStateChanged((user) => {
      this.currentUserType = localStorage.getItem('currentUserType');
      if (user) {
        this.currentUserEmail = user.email;
      }
      this.appSvc.getAppointments().subscribe(apps => {
        this.appList = apps;
        if(this.currentUserType == 'admin'){
          this.userAppList = apps;
        } else {
          this.userAppList = this.appList?.filter(u => u.doctorEmail === this.currentUserEmail);
          if(this.userAppList.length < 1){
            this.userAppList = this.appList?.filter(u => u.patientEmail === this.currentUserEmail);
          }
        }
      })

    }) 
   }

  ngOnInit(): void {
  }

}
