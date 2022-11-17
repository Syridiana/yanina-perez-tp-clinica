import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { addDoc, collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  constructor(private firestore: Firestore, private angularFireAuth: AngularFireAuth) {

   }

   addHistoriaClinica(historia: any) {
    const userRef = collection(getFirestore(), 'historias');
    return addDoc(userRef, historia);
  }

}
