import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { SpinnerService } from '../Services/spinner.service';

@Directive({
  selector: 'img[loaded]'
})
export class ImageLoadingDirective {

  @Output() loaded = new EventEmitter();

  @HostListener('load')
  onLoad() {
    this.loaded.emit();
  }

  constructor(private elRef: ElementRef<HTMLImageElement>) {
    if (this.elRef.nativeElement.complete) {
      this.loaded.emit();
    }
  }

}
