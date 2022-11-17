import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { addDoc, collection, collectionData, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { HistoriaI } from '../Entities/historiaClinica-interface';

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

  getHistoriaFromUser(patientEmail: string) {
    const userRef = collection(getFirestore(), 'historias');
    const filteredHistorias = query(userRef, where("patientEmail", "==", patientEmail));
    if(filteredHistorias){
      return collectionData(filteredHistorias) as Observable<HistoriaI[]>;
    } else {
      return undefined;
    }

  }


}
