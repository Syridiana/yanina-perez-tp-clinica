import { Component, OnInit } from '@angular/core';
import { SpecialtyService } from 'src/app/Services/specialty.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  currentDate = new Date(); 
  specialties: string[];
  selectedSpecialty: string | undefined;

  constructor(private spacialtyService: SpecialtyService) {
    this.specialties = [];

    this.spacialtyService.getSpecialties().subscribe(spe => {
      this.specialties = [];
      spe.forEach((element: any) => {
        this.specialties?.push(element.specialtyName);
      });
    }) 
   }

  ngOnInit(): void {
  }

  selectSpecialty(e: any){
    this.selectSpecialty = e.target.getAttribute('data-value');
  }

}
