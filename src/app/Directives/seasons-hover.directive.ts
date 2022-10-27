import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSeasonsHover]'
})
export class SeasonsHoverDirective {
  constructor(private el: ElementRef) { }


  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#1F4B8E', 'white');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('', 'black');
  }

  @HostListener('window:keydown.enter', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.el.nativeElement.style.backgroundColor = '#FB6801';
  }



  private highlight(color: string, fontColor: string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.color = fontColor;
  }


}
