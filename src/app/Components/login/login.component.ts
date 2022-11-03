// Angular
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

// Alerts
import Swal from 'sweetalert2';
import { FirebaseCodeErrorService } from 'src/app/Services/firebase-code-error.service';

// BD and Auth
import { AngularFireAuth } from '@angular/fire/compat/auth'

// Interfaces
import { UserI } from 'src/app/Entities/user-interface';

import { SpecialtiesC } from 'src/app/Entities/specialties';
import { UserFirestoreService } from 'src/app/Services/user-firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  typeOfUser = 'patient';
  typeOfUserDisplay = 'Paciente';
  typeOfUserDisplayOther = 'Médico';
  currentUserEmail: any;
  currentUser: any;
  userType: any;

  specialities: Array<string>;


  // Forms
  userRegister: FormGroup;
  userLogin: FormGroup;

  // Users in Firestore
  usersArray: UserI[] | undefined;

  // User data
  email: string | undefined;
  password: string | undefined;
  passwordRepeat: string | undefined;
  name: string | undefined;


  constructor(private fb: FormBuilder, private specialty: SpecialtiesC,
    private afAuth: AngularFireAuth,
    private router: Router, private FirebaseCodeError: FirebaseCodeErrorService,
    private userFirestoreService: UserFirestoreService) {

    this.specialities = specialty.getSpecialtiesList();

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

    // Form validators - Login
    this.userLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });


    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserEmail = user.email;
      }
      this.userFirestoreService.getUsers().subscribe(users => {
        this.usersArray = users;
        this.currentUser = this.usersArray?.find(u => u.email === this.currentUserEmail);
        this.userType = this.currentUser?.type;
      })
    })

    this.userFirestoreService.getUsers().subscribe(users => {
      this.usersArray = users;
    })


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


    // Users in DB
    this.userFirestoreService.getUsers().subscribe(users => {
      this.usersArray = users;
    })

  }




  login(): void {
    this.email = this.userLogin.value.email;
    this.password = this.userLogin.value.password;

    this.afAuth.signInWithEmailAndPassword(this.email!, this.password!).then((user) => {

      let aUser = this.usersArray?.find(u => u.email === this.email);

      if (aUser?.type === 'doctor') {
        if (!aUser?.verified) {
          this.afAuth.signOut();
          this.currentUser = undefined;
          throw new Error('Usuario no habilitado. Comuniquese con el administrador');
        } else {
          this.router.navigate(['/']);
        }
      } else if (aUser?.type === 'patient') {
        if (user && user.user?.emailVerified) {
          this.router.navigate(['/']);
        } else if (user) {
          this.router.navigate(['/verification']);
          throw new Error('Email sin verificar. Revise su email para verificar este usuario');
        }
      } else if (!user) {
        this.router.navigate(['/register']);
        throw new Error('Usuario sin registrar. Por favor registre su usuario');
      } else {
        this.router.navigate(['/']);
      }


      Swal.fire({
        title: 'Usuario logueado',
        text: "Usuario logueado con éxito",
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        background: "#00af00",
        iconColor: "#fff",
        color: "#fff"
      })

    }).catch((error) => {

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


  /*   setUser(user: any) {
      localStorage.setItem('testObject', JSON.stringify(user));
    } */

  autoCompleteAdmin(): void {
    this.userLogin.controls['email'].setValue("admin1@admin.com");
    this.userLogin.controls['password'].setValue("123456");
  }

  autoCompletePatient1(): void {
    this.userLogin.controls['email'].setValue("hvjjgjuirqlbajfqyt@tmmwj.net");
    this.userLogin.controls['password'].setValue("123456");
  }

  autoCompleteDoctor1(): void {
    this.userLogin.controls['email'].setValue("doctor1@doctor.com");
    this.userLogin.controls['password'].setValue("123456");
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

}
