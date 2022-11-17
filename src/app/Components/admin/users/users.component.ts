import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TurnoI } from 'src/app/Entities/turno-interface';
import { UserI } from 'src/app/Entities/user-interface';
import { AppointmentsService } from 'src/app/Services/appointments.service';
import { SpinnerService } from 'src/app/Services/spinner.service';
import { UserFirestoreService } from 'src/app/Services/user-firestore.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersArray: UserI[] | undefined;
  fileName = 'RegistroUsuarios.xlsx';

  constructor(private userFirestoreService: UserFirestoreService, private angularFireAuth: AngularFireAuth,
    private spinnerService: SpinnerService) {
    this.spinnerService.show();

    this.userFirestoreService.getUsers().subscribe(users => {
      this.usersArray = users;
      this.spinnerService.hide();
    })
  }

  ngOnInit(): void {
  }

  exportExcel() {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
