import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { HistoriaClinicaService } from 'src/app/Services/historia-clinica.service';

@Component({
  selector: 'app-user-historia-clinica',
  templateUrl: './user-historia-clinica.component.html',
  styleUrls: ['./user-historia-clinica.component.css']
})
export class UserHistoriaClinicaComponent implements OnInit {
  @Input() userEmail: any;
  historias: Array<any> | undefined;

  constructor(private historiaSvc: HistoriaClinicaService) {
  }


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.historiaSvc.getHistoriaFromUser(this.userEmail)?.subscribe(hist => {
      this.historias = hist;
    })
  }

}
