import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { addDoc, collection, collectionData, updateDoc, doc, Firestore, query, where, getDocs } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import AgendaI from '../Entities/agenda-interface';
import HorarioI from '../Entities/horario-interface';
import { TurnoI } from '../Entities/turno-interface';
import { UserI } from '../Entities/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  

  constructor(private firestore: Firestore, private angularFireAuth: AngularFireAuth) {
  }

  getAppointments() {
    const apRef = collection(getFirestore(), 'turnos');
    return collectionData(apRef, { idField: 'uid' }) as Observable<TurnoI[]>;
  }

  changeAppointmentState(uid: string, state: string) {
    const userDocRef = doc(getFirestore(), `turnos/${uid}`);
    return updateDoc(userDocRef, { state: state });
  }

  addQualification(uid: string, qualifcation: string) {
    const userDocRef = doc(getFirestore(), `turnos/${uid}`);
    return updateDoc(userDocRef, { patientQualification: qualifcation });
  }


  addComment(uid: string, comment: string) {
    const userDocRef = doc(getFirestore(), `turnos/${uid}`);
    return updateDoc(userDocRef, { review: comment });
  }

  /*   async addHorarios(uid: string, horario: string, day: string, doctorEmail: string) {
      const ref = collection(getFirestore(), "turnos-disponibles");
  
      const q = query(ref, where("emailDoctor", "==", doctorEmail));
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc2) => {
        console.log(doc2.id, " => ", doc2.data());
        const userDocRef = doc(getFirestore(), `turnos-disponibles/${doc2.id}`);
        switch(day){
          case 'monday':
            updateDoc(userDocRef, { monday: qualifcation });
            break;
        }
        
      });
  
      const docRef = doc(getFirestore(), `turnos-disponibles/${uid}`);
      const userDocRef = doc(getFirestore(), `turnos-disponibles/${uid}`);
    } */


  getHorarios() {
    const apRef = collection(getFirestore(), 'turnos-disponibles');
    return collectionData(apRef, { idField: 'uid' }) as Observable<HorarioI[]>;
  }

  addHorarios(horario: HorarioI) {
    const userDocRef = doc(getFirestore(), `turnos-disponibles/${horario.uid}`);
    return updateDoc(userDocRef, {
      emailDoctor: horario.emailDoctor,
      agenda: horario.agenda
    });
  }

  addAgendaNuevoMedico(emailDoctor: string) {
    const userRef = collection(getFirestore(), 'turnos-disponibles');
    return addDoc(userRef, {
      emailDoctor: emailDoctor,
      agenda: {
        lunes: { '08:00': false, '09:00': false,'10:00': false,'11:00': false,'12:00': false,'13:00': false,'14:00': false, '15:00': false,'16:00': false,'17:00': false,
        '18:00': false,'19:00': false},
        martes: { '08:00': false, '09:00': false,'10:00': false,'11:00': false,'12:00': false,'13:00': false,'14:00': false, '15:00': false,'16:00': false,'17:00': false,
        '18:00': false,'19:00': false},
        miercoles: { '08:00': false, '09:00': false,'10:00': false,'11:00': false,'12:00': false,'13:00': false,'14:00': false, '15:00': false,'16:00': false,'17:00': false,
        '18:00': false,'19:00': false},
        jueves: { '08:00': false, '09:00': false,'10:00': false,'11:00': false,'12:00': false,'13:00': false,'14:00': false, '15:00': false,'16:00': false,'17:00': false,
        '18:00': false,'19:00': false},
        viernes: { '08:00': false, '09:00': false,'10:00': false,'11:00': false,'12:00': false,'13:00': false,'14:00': false, '15:00': false,'16:00': false,'17:00': false,
        '18:00': false,'19:00': false},
        sabado: { '08:00': false, '09:00': false,'10:00': false,'11:00': false,'12:00': false,'13:00': false,'14:00': false}
      }
    });
  }
}
