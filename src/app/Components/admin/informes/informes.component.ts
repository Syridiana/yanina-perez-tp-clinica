import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { EstadisticasService } from 'src/app/Services/estadisticas.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { AppointmentsService } from 'src/app/Services/appointments.service';
import { SpinnerService } from 'src/app/Services/spinner.service';


Chart.register(...registerables);

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  listaLogs: Array<any> | undefined;
  logLabels: string[] = [];
  logData: number[] = [];
  turnosFinalizados: Array<any> | undefined;
  listaTurnos: Array<any> | undefined;
  doctorLabels: string[] = [];
  doctorData: number[] = [];

  constructor(private estatsSvc: EstadisticasService, private appSvc: AppointmentsService,
    private spinner: SpinnerService) {
    this.spinner.show();
    this.estatsSvc.getLogs().subscribe(logs => {
      this.listaLogs = logs;
      this.listaLogs.forEach( item => {
        if(this.logLabels.findIndex(u => u == item.user)){
          this.logLabels.push(item.user);
        }

        let someUser = this.logLabels.findIndex(u => u == item.user);
        if(this.logData[someUser] > 0){
          this.logData[someUser] = this.logData[someUser] + 1;
        } else {
          this.logData[someUser] = 1;
        }
      })



      this.appSvc.getAppointments().subscribe(apps => {
        this.listaTurnos = apps;

        this.listaTurnos.forEach( item => {
          if((this.doctorLabels.findIndex(u => u == item.doctorEmail) < 0) && item.state == 'realizado'){
            this.doctorLabels.push(item.doctorEmail);
          }
  
          let someDoctor = this.doctorLabels.findIndex(u => u == item.doctorEmail);
          if(this.doctorData[someDoctor] > 0){
            this.doctorData[someDoctor] = this.doctorData[someDoctor] + 1;
          } else {
            this.doctorData[someDoctor] = 1;
          }
        })

      })
      this.spinner.hide();
    })

  }

  ngOnInit(): void {


  }

  generateLogGraphic() {
    if (this.logLabels) {
      var myChart = new Chart("myChart", {
        type: 'bar',
        data: {
          labels: this.logLabels,
          datasets: [{
            label: 'Cantidad de Logins',
            data: this.logData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }


  generateDoctorGraphic() {
    if (this.doctorLabels) {
      var myChart = new Chart("myChart", {
        type: 'bar',
        data: {
          labels: this.doctorLabels,
          datasets: [{
            label: 'Cantidad de Logins',
            data: this.doctorData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  descargar(){
    let element =  document.getElementById("myChart");
    if(element){
      html2canvas(element).then((canvas) => {
        let imgData = canvas.toDataURL('image/png');

        let doc = new jspdf();

        doc.addImage(imgData, 0, 0, 180, 100);
        doc.save("dataLogs.pdf");
      })
    }

  }
}
