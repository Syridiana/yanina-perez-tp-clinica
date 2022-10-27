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


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  typeOfUser = 'patient';
  typeOfUserDisplay = 'Paciente';
  typeOfUserDisplayOther = 'Médico';

  specialities: Array<string>;


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
  specialty: string | undefined;
  healthInsurance: string | undefined;

  constructor(private fb: FormBuilder, private specialtyC:  SpecialtiesC, private afAuth: AngularFireAuth,
    private router: Router, private FirebaseCodeError: FirebaseCodeErrorService,
    private userFirestoreService: UserFirestoreService ) {

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

    // Users in DB
/*     this.userFirestoreService.getUsers().subscribe(users => {
      this.usersArray = users;
    }) */

  }



register() {
    this.email = this.userRegister.value.email;
    this.password = this.userRegister.value.password;
    this.passwordRepeat = this.userRegister.value.passwordRepeat;
    this.name = this.userRegister.value.name;
    this.lastName = this.userRegister.value.lastName;
    this.age = this.userRegister.value.age;
    this.id = this.userRegister.value.id;
    this.specialty = this.userRegister.value.specialty;
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

        this.router.navigate(['/']);

        this.userFirestoreService.addUser({
          'type': this.typeOfUser,
          'email': this.email,
          'name': this.name,
          'lastName': this.lastName,
          'age': this.age,
          'id': this.id,
          'specialty': this.specialty,
          'healthInsurance': this.healthInsurance
        });// TODO - Make a function to handle this


      }).catch((error) => {
        console.log(error)

        Swal.fire({
          title: 'Error!',
          text: this.FirebaseCodeError.codeError(error.code),
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


/*   login(): void {
    this.email = this.userLogin.value.email;
    this.password = this.userLogin.value.password;

    this.afAuth.signInWithEmailAndPassword(this.email!, this.password!).then((user) => {

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

      this.router.navigate(['/']);

      const currentDate = new Date();// TODO - Make a function to handle this
      const cValue = formatDate(currentDate, 'medium', 'en-US');// TODO - Make a function to handle this

      const userActive = this.usersArray!.find(u => u.email === this.email); // TODO - Make a function to handle this

      this.userFirestoreService.updateUser(userActive!, cValue); // TODO - Make a function to handle this

      localStorage.setItem('userActive', JSON.stringify({
        'id': userActive!.id,
        'email': userActive!.email,
        'points': userActive!.points,
        'loginDate': userActive!.loginDate,
        'userName': userActive!.userName,
      }));// TODO - Make a function to handle this

    }).catch((error) => {

      Swal.fire({
        title: 'Error!',
        text: this.FirebaseCodeError.codeError(error.code),
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

  } */


/*   setUser(user: any) {
    localStorage.setItem('testObject', JSON.stringify(user));
  } */

/*   autoComplete(): void {
    this.userLogin.controls['email'].setValue("test@test.com");
    this.userLogin.controls['password'].setValue("test123");
  }
 */
  toggleRegister(){
    if(this.typeOfUser === 'patient'){
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


