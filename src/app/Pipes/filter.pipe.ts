import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';
import { TurnoI } from '../Entities/turno-interface';

@Pipe({
  name: 'filterDoctor'
})
export class FilterPipe implements PipeTransform {

  transform(appointments: TurnoI[], filterText: string) {
    if(appointments.length === 0 || filterText === ""){
      return appointments;
    } else {
      return appointments.filter((u) => {
        return u.doctorName?.toLowerCase().includes(filterText.toLowerCase());
      })
    }
  }

}
