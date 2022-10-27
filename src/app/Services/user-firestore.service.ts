import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, updateDoc, doc } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { UserI } from '../Entities/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserFirestoreService {

  constructor() { }

  addUser(user: UserI){
    const userRef = collection(getFirestore(), 'users-clinic');
    return addDoc(userRef, user);
  }

  updateUser(user: UserI, date: string){
    const userDocRef = doc(getFirestore(), `users-clinic/${user.id}`);
    return updateDoc(userDocRef, { loginDate: date });
  }


  getUsers(){
    const userRef = collection(getFirestore(), 'users-clinic');
    return collectionData(userRef, { idField : 'id' }) as Observable<UserI[]>;
  }


  
}
