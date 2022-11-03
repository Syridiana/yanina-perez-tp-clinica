import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { addDoc, collection, collectionData, updateDoc, doc, Firestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { TurnoI } from '../Entities/turno-interface';
import { UserI } from '../Entities/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {


  constructor(private firestore: Firestore, private angularFireAuth: AngularFireAuth) { 

  }

  getAppointments(){
    const apRef = collection(getFirestore(), 'turnos');
    return collectionData(apRef, { idField : 'uid' }) as Observable<TurnoI[]>;
  }
}
