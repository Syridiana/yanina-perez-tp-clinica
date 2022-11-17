import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { EstadisticasService } from 'src/app/Services/estadisticas.service';
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

  constructor(private estatsSvc: EstadisticasService) {
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

      if (this.logLabels) {
        var myChart = new Chart("myChart", {
          type: 'bar',
          data: {
            labels: this.logLabels,
            datasets: [{
              label: 'Number of logs',
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

    })

  }

  ngOnInit(): void {


  }

  generateLogGraphic() {

  }

}
