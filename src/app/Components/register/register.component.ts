// Angular
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

// Alerts
import Swal from 'sweetalert2';
/* import { FirebaseCodeErrorService } from 'src/app/Services/firebase-code-error.service'; */

// BD and Auth
/* import { UserFirestoreService } from 'src/app/Services/user-firestore-service.service'; */
import { AngularFireAuth } from '@angular/fire/compat/auth'

// Interfaces
import { UserI } from 'src/app/Entities/user-interface';

import { SpecialtiesC } from 'src/app/Entities/specialties';
import { UserFirestoreService } from 'src/app/Services/user-firestore.service';
import { FirebaseCodeErrorService } from 'src/app/Services/firebase-code-error.service';
import { AuthService } from 'src/app/Services/auth.service';

import { AngularFireStorage/* , AngularFireStorageReference, AngularFireUploadTask  */ } from '@angular/fire/compat/storage';
import { AppointmentsService } from 'src/app/Services/appointments.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  @Input() isInAdminPage?: boolean;

  /*   ref: AngularFireStorageReference | undefined;
    task: AngularFireUploadTask | undefined;  */

  typeOfUser = 'patient';
  typeOfUserDisplay = 'Paciente';
  typeOfUserDisplayOther = 'Médico';

  specialities: Array<string>;

  reader = new FileReader();


  // Forms
  userRegister: FormGroup;

  // Users in Firestore
  usersArray: UserI[] | undefined;

  // User data
  email: string | undefined;
  password: string | undefined;
  passwordRepeat: string | undefined;
  name: string | undefined;
  lastName: string | undefined;
  age: string | undefined;
  id: string | undefined;
  specialty = "";
  healthInsurance = "";
  photo_1: any = "";
  photo_2: any = "";

  file_1: File | null = null;

  constructor(private fb: FormBuilder, private specialtyC: SpecialtiesC, private afAuth: AngularFireAuth,
    private router: Router, private FirebaseCodeError: FirebaseCodeErrorService,
    private userFirestoreService: UserFirestoreService, private authService: AuthService,
    private appService: AppointmentsService) {

    this.specialities = specialtyC.getSpecialtiesList();

    // Form validators - Register
    this.userRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.max(130), Validators.min(0)]],
      id: ['', Validators.required],
      specialty: ['', Validators.required],
      healthInsurance: ['', Validators.required],
      photo_1: ['', Validators.required],
      photo_2: ['', Validators.required]
    });

    this.userRegister.controls['specialty'].disable();

  }

  ngOnInit(): void {
    // Buttons
    const switchers = document.querySelectorAll('.switcher');

    switchers.forEach(item => {
      item.addEventListener('click', function () {
        switchers.forEach(item2 => item2.parentElement?.classList.remove('is-active'))
        item.parentElement?.classList.add('is-active')
      })
    })

  }



  register() {
    this.email = this.userRegister.value.email;
    this.password = this.userRegister.value.password;
    this.passwordRepeat = this.userRegister.value.passwordRepeat;
    this.name = this.userRegister.value.name;
    this.lastName = this.userRegister.value.lastName;
    this.age = this.userRegister.value.age;
    this.id = this.userRegister.value.id;
    this.specialty = this.userRegister.getRawValue().specialty;
    this.healthInsurance = this.userRegister.value.healthInsurance;


    if (this.password != this.passwordRepeat) {

      Swal.fire({
        title: 'Error!',
        text: "Las contraseñas no coindicen",
        icon: 'error',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        background: "#ff3030",
        iconColor: "#fff",
        color: "#fff"
      })

    } else {
      this.afAuth.createUserWithEmailAndPassword(this.email!, this.password!).then((user) => {

        Swal.fire({
          title: 'Usuario registrado',
          text: "Usuario registrado con éxito",
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          background: "#00af00",
          iconColor: "#fff",
          color: "#fff"
        })



        this.userFirestoreService.addUser({
          'type': this.typeOfUser,
          'email': this.email,
          'name': this.name,
          'lastName': this.lastName,
          'age': this.age,
          'id': this.id,
          'specialty': this.specialty,
          'healthInsurance': this.healthInsurance,
          'photo_1': this.photo_1,
          'photo_2': this.photo_2,
          'verified': false
        });// TODO - Make a function to handle this

        if (this.typeOfUser === 'patient') {
          this.authService.sendEmailVerification();
          this.router.navigate(['/verification']);
        } else if (this.typeOfUser === 'doctor') {
          this.appService.addAgendaNuevoMedico(this.email)
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/']);
        }



      }).catch((error) => {
        console.log(error)

        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          background: "#ff3030",
          iconColor: "#fff",
          color: "#fff"
        })

      });
    }

  }


  toggleRegister() {
    if (this.typeOfUser === 'patient') {
      this.typeOfUser = 'doctor';
      this.typeOfUserDisplay = 'Médico';
      this.typeOfUserDisplayOther = 'Paciente';
    } else {
      this.typeOfUser = 'patient';
      this.typeOfUserDisplay = 'Paciente';
      this.typeOfUserDisplayOther = 'Médico';
    }
  }


  addSpecialty(specialty: string) {
    this.userRegister.controls['specialty'].setValue(specialty);
  }

  adminRegister() {
    this.typeOfUser = 'admin';
    this.typeOfUserDisplay = 'Administrador';
  }

  async encodeImage_1(e: any) {

    if (e.target.files.length > 0) {
      this.file_1 = e.target.files[0];
    }

    this.parseImgBase64(this.file_1).then((data) => {
      this.photo_1 = data;
    })

  }

  async encodeImage_2(e: any) {
    if (e.target.files.length > 0) {
      this.file_1 = e.target.files[0];
    }

    this.parseImgBase64(this.file_1).then((data) => {
      this.photo_2 = data;
    })

  }

  parseImgBase64(file: any) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        resolve(reader.result);
      }

    })
  }

  autoRegisterPatient() {
    if(this.typeOfUser == 'doctor'){
      this.toggleRegister();
    }
    this.userRegister.controls['email'].setValue("patient3@patient.com");
    this.userRegister.controls['password'].setValue("123456");
    this.userRegister.controls['passwordRepeat'].setValue("123456");
    this.userRegister.controls['name'].setValue("Jose");
    this.userRegister.controls['lastName'].setValue("Gimenez");
    this.userRegister.controls['age'].setValue("51");
    this.userRegister.controls['id'].setValue("546546");
    this.userRegister.controls['healthInsurance'].setValue("Medicus");
    this.photo_1 = 'data:image/jpeg;base64,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';
    this.photo_2 = 'data:image/jpeg;base64,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';
    this.typeOfUser = 'patient';



  }

  autoRegisterDoctor() {
    if(this.typeOfUser == 'patient'){
      this.toggleRegister();
    }
    this.userRegister.controls['email'].setValue("doctor3@doctor.com");
    this.userRegister.controls['password'].setValue("123456");
    this.userRegister.controls['passwordRepeat'].setValue("123456");
    this.userRegister.controls['name'].setValue("Jose");
    this.userRegister.controls['lastName'].setValue("Lopez");
    this.userRegister.controls['age'].setValue("51");
    this.userRegister.controls['id'].setValue("546542");
    this.userRegister.controls['specialty'].setValue("Odontología");
    this.photo_1 = 'data:image/jpeg;base64,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';
    this.typeOfUser = 'doctor';


  }

}


