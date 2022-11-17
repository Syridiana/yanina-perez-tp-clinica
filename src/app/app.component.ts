import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { fader } from './utils/route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fader,
  ]
})
export class AppComponent {
  title = 'yanina-perez-clinica';

  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData['animation'];
  }
}
