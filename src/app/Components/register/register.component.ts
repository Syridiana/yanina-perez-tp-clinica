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
  photo_2:any = "";

  file_1: File | null = null;

  constructor(private fb: FormBuilder, private specialtyC: SpecialtiesC, private afAuth: AngularFireAuth,
    private router: Router, private FirebaseCodeError: FirebaseCodeErrorService,
    private userFirestoreService: UserFirestoreService, private authService: AuthService/* , 
    private afStorage: AngularFireStorage */) {

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



    if (this.password !== this.passwordRepeat) {

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

  parseImgBase64(file:any){
    return new Promise((resolve, reject) => {
      var reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        resolve(reader.result);
      }

    })
  }
  

}


