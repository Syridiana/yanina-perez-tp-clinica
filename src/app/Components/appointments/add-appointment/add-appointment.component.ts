import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserI } from 'src/app/Entities/user-interface';
import { SpecialtyService } from 'src/app/Services/specialty.service';
import { SpinnerService } from 'src/app/Services/spinner.service';
import { UserFirestoreService } from 'src/app/Services/user-firestore.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  currentDate = new Date();
  specialties: string[];
  selectedDoctorEmail: any;
  selectedSpecialty: string | undefined;
  currentUserEmail: any | undefined;
  userType: any | undefined;
  currentUser: any | undefined;
  doctorsArray: UserI[] = [];
  usersArray: UserI[] = [];
  patientsArray: UserI[] = [];
  selectedDoctorFullName: string | undefined;
  selectedUserEmail: any | undefined;
  selectedUserFullName: any | undefined;

  constructor(private spacialtyService: SpecialtyService, private userFirestoreService: UserFirestoreService,
    private spinner: SpinnerService, private angularFireAuth: AngularFireAuth) {
    this.spinner.show()

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
/*         this.currentUserName = this.currentUser?.name;
        this.currentUserLastName = this.currentUser?.lastName; */
      })


    })

    this.specialties = [];

    this.spacialtyService.getSpecialties().subscribe(spe => {
      this.specialties = [];
      spe.forEach((element: any) => {
        this.specialties?.push(element.specialtyName);
      });
      this.spinner.hide();
    })

    this.userFirestoreService.getUsers().subscribe(users => {
      users.forEach((user: any) => {
        if (user.type === 'doctor') {
          this.doctorsArray.push(user);
        } else if (user.type === 'patient') {
          this.patientsArray.push(user);
        }
      })
    })


  }

  ngOnInit(): void {
  }

  selectSpecialty(e: any) {
    this.selectedSpecialty = e.target.getAttribute('data-value');
    this.selectedDoctorEmail = '';
  }

  selectDoctor(doctor: any) {
    this.selectedDoctorEmail = doctor.email;
    this.selectedDoctorFullName = doctor.name + ' ' + doctor.lastName;
  }

  selectPatient(patient: any) {
    this.selectedUserEmail = patient.email;
    this.selectedUserFullName = patient.name + ' ' + patient.lastName;
  }

}
