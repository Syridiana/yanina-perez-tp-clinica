import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentsService } from 'src/app/Services/appointments.service';
import { HistoriaClinicaService } from 'src/app/Services/historia-clinica.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historica-clinica',
  templateUrl: './historica-clinica.component.html',
  styleUrls: ['./historica-clinica.component.css']
})
export class HistoricaClinicaComponent implements OnInit {
  @Input() selectedPatient: any | undefined;
  @Input() currentApp: any | undefined;
  @Input() specialty: any | undefined;
  @Input() doctorEmail: any | undefined;
  @Input() doctorName: any | undefined;

    // Forms
    historiaClinicaForm: FormGroup;


  constructor(private fb: FormBuilder, private historiaService: HistoriaClinicaService, private appSvc: AppointmentsService) {

    // Form validators - Register
    this.historiaClinicaForm = this.fb.group({
      altura: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      temperatura: ['', Validators.required],
      presion: ['', Validators.required],
      data: this.fb.array([]) ,  
    });
  }

  data() : FormArray {  
    return this.historiaClinicaForm.get("data") as FormArray  
  }  
     
  newField(): FormGroup {  
    return this.fb.group({  
      titulo: '',  
      valor: '',  
    })  
  }  
     
  addField() {  
    this.data().push(this.newField());  
  }  
     
  removeField(i:number) {  
    this.data().removeAt(i);  
  }  

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {


  }

  register(){
    try {
      this.historiaService.addHistoriaClinica({
        altura: this.historiaClinicaForm.value.altura,
        peso: this.historiaClinicaForm.value.peso,
        temperatura: this.historiaClinicaForm.value.temperatura,
        presion: this.historiaClinicaForm.value.presion,
        data: this.historiaClinicaForm.value.data,
        patientEmail: this.selectedPatient.email,
        specialty: this.specialty,
        doctorEmail: this.doctorEmail,
        date: new Date(),
        doctorName: this.doctorName
      })

      this.appSvc.changeAppointmentState(this.currentApp?.uid, 'realizado');

      Swal.fire({
        title: 'Success!',
        text: 'Historia cargada correctamente',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        background: "#00af00",
        iconColor: "#fff",
        color: "#fff"
      })
    }    catch (e: any) {
      Swal.fire({
        title: 'Error!',
        text: e.message,
        icon: 'error',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        background: "#ff3030",
        iconColor: "#fff",
        color: "#fff"
      })
    }
  }

}
