import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/Services/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private spinnerService: SpinnerService) { 
    this.spinnerService.show();

    setTimeout(function () {spinnerService.hide()}, 2000)
  }

  ngOnInit(): void {
  }

}
