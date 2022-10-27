import { Directive, HostListener } from '@angular/core';
import { SpinnerService } from '../Services/spinner.service';

@Directive({
  selector: 'img'
})
export class ImageLoadingDirective {

  constructor(private spinnerService: SpinnerService) {
 /*    spinnerService.show(); */
   }

   @HostListener('load')
   onLoad() {
   /*   this.spinnerService.hide(); */
   }

}
