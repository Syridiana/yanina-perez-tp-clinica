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

  changeAppointmentState(uid: any, state: string) {
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

  addDiagosis(uid: any, comment: string) {
    const userDocRef = doc(getFirestore(), `turnos/${uid}`);
    return updateDoc(userDocRef, { doctorReview: comment });
  }

  addTurno(turno: TurnoI) {
    const userRef = collection(getFirestore(), 'turnos');
    return addDoc(userRef, turno);
  }



  getHorarios() {
    const apRef = collection(getFirestore(), 'turnos-disponibles');
    return collectionData(apRef, { idField: 'uid' }) as Observable<HorarioI[]>;
  }

  addAgendaNuevoMedico(emailDoctor: any) {
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


  updateAgenda(emailDoctor: string, horario: any) {
    const userDocRef = doc(getFirestore(), `turnos-disponibles/${horario.uid}`);
    return updateDoc(userDocRef, {
      emailDoctor: emailDoctor,
      agenda: horario.agenda
    });
  }
}
