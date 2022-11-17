import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { addDoc, collection, collectionData, updateDoc, doc, Firestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { LogsI } from '../Entities/logs-interface';
import { UserI } from '../Entities/user-interface';


@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor() { }

  getLogs(){
    const userRef = collection(getFirestore(), 'loginLogs');
    return collectionData(userRef, { idField : 'uid' }) as Observable<LogsI[]>;
  }

  
}
