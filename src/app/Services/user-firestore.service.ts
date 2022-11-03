import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { addDoc, collection, collectionData, updateDoc, doc, Firestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { UserI } from '../Entities/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserFirestoreService {
  currentUser: any;
  currentUserEmail: any;
  userList: UserI[] | undefined;
  currentUserLastName: any;
  currentUserName: any;
  currentUserType: any;

  constructor(private firestore: Firestore, private angularFireAuth: AngularFireAuth) { 

    this.angularFireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserEmail = user.email;
      }
      this.getUsers().subscribe(users => {
        this.userList = users;
        this.currentUser = this.userList?.find(u => u.email === this.currentUserEmail);
        this.currentUserType = this.currentUser?.type;
        this.currentUserName = this.currentUser?.name;
        this.currentUserLastName = this.currentUser?.lastName;
      })
    }) 
  }

  addUser(user: UserI){
    const userRef = collection(getFirestore(), 'users-clinic');
    return addDoc(userRef, user);
  }

  updateDoctorVerification(uid: string, verified: boolean){
    const userDocRef = doc(getFirestore(), `users-clinic/${uid}`);
    return updateDoc(userDocRef, { verified: verified });
  }


  getUsers(){
    const userRef = collection(getFirestore(), 'users-clinic');
    return collectionData(userRef, { idField : 'uid' }) as Observable<UserI[]>;
  }


  getCurrentUserType(){
    return localStorage.getItem('profile')
  }

  
}
