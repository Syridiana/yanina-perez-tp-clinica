import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserI } from 'src/app/Entities/user-interface';
import { UserFirestoreService } from 'src/app/Services/user-firestore.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  usersArray: UserI[] | undefined;
  doctorsArrayActive: UserI[]  = [];
  doctorsArrayInactive: UserI[]  = [];
  

  constructor(private angularFireAuth: AngularFireAuth, private userFirestoreService: UserFirestoreService) {
    this.userFirestoreService.getUsers().subscribe(users => {
      this.usersArray = users;
      this.doctorsArrayActive = [];
      this.doctorsArrayInactive = [];
      this.usersArray.forEach(element => {
        if(element.type === 'doctor'){
          if(element.verified){
            this.doctorsArrayActive?.push(element);
          } else {
            this.doctorsArrayInactive?.push(element);
          }
        }
      });
    });
  }

  ngOnInit(): void {
  }

  activateDoctor(uid: any){
    this.userFirestoreService.updateDoctorVerification(uid, true)
  }

  inactivateDoctor(uid: any){
    this.userFirestoreService.updateDoctorVerification(uid, false)
  }
}
