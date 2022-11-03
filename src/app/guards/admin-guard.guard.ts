import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserFirestoreService } from '../Services/user-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanDeactivate<unknown> {
  public currentUser: any;

  constructor(private afAuth: AngularFireAuth, private uService: UserFirestoreService, private router: Router) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
      }
    })

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.checkUserType()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
  checkUserType(): boolean{
    return (this.uService.getCurrentUserType() === 'admin');
  }

}
