import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-verification-email',
  templateUrl: './verification-email.component.html',
  styleUrls: ['./verification-email.component.css'],
  providers: [AuthService]
})
export class VerificationEmailComponent implements OnInit {
  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService, private angularFireAuth: AngularFireAuth, private router: Router) {

    this.angularFireAuth.onAuthStateChanged((user) => {
      if (user?.emailVerified) {
        this.router.navigate(['/']);
      }
    });
    
  }

  ngOnInit(): void {
  }

  resendEmailVerification() {
    this.authSvc.sendEmailVerification();
  }

}
