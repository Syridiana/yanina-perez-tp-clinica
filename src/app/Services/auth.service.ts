import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  async sendEmailVerification():Promise<void>{
    return (await this.afAuth.currentUser)?.sendEmailVerification();
  }

}
