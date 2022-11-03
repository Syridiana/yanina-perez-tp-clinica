import { Component, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { SpecialtiesC } from 'src/app/Entities/specialties';
import { SpecialtyService } from 'src/app/Services/specialty.service';

@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrls: ['./speciality-list.component.css']
})
export class SpecialityListComponent implements OnInit {
  @Output() emitSpecialty: EventEmitter<string> =  new EventEmitter<string>();
  newSpecialty?: string;

  specialties: string[];

  constructor(private specialtyC:  SpecialtiesC, private spacialtyService: SpecialtyService) {
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



  selectSpecialty(e: any) {
    this.emitSpecialty.emit(e.target.value);
  }

  addNewSpecialty(){
    if(this.newSpecialty != undefined){
      this.emitSpecialty.emit(this.newSpecialty);
      this.spacialtyService.addSpecialty(this.newSpecialty)
    }
  }
}
