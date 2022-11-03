import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  constructor(private firestore: Firestore) { }

  addSpecialty(specialty: string){
    const speRef = collection(getFirestore(), 'specialties');
    return addDoc(speRef, {specialtyName: specialty});
  }


  getSpecialties(){
    const speRef = collection(getFirestore(), 'specialties');
    return collectionData(speRef, { idField : 'id' }) as Observable<any>;
  }
}
