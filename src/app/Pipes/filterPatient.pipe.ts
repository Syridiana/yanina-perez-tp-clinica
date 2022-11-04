import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';
import { TurnoI } from '../Entities/turno-interface';

@Pipe({
  name: 'filterPatient'
})
export class FilterPipePatient implements PipeTransform {

  transform(appointments: TurnoI[], filterText: string) {
    if(appointments.length === 0 || filterText === ""){
      return appointments;
    } else {
      return appointments.filter((u) => {
        return u.patientName?.toLowerCase().includes(filterText.toLowerCase());
      })
    }
  }

}
