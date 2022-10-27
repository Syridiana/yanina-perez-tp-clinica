import { Directive, ElementRef } from '@angular/core';
import { stringLength } from '@firebase/util';

@Directive({
  selector: '[appSeasons]'
})
export class SeasonsDirective {
  seasonColor: string | undefined;
  date: Date | undefined;
  springColor = '#BA2890';
  summerColor = '#FB6801';
  winterColor = '#1F4B8E';
  fallColor = '#9A031E';


  constructor(private el: ElementRef) {

      this.date = new Date();

      switch(this.date.getMonth()) {
          case 12:
            if(this.date.getDay() < 22){
              this.seasonColor = this.springColor;
            } else {
              this.seasonColor = this.summerColor;
            }
            break;
          case 1:
          case 2:
              this.seasonColor = this.summerColor;
          break;
          case 3:
            if(this.date.getDay() < 22){
              this.seasonColor = this.summerColor;
            } else {
              this.seasonColor = this.fallColor;
            }
            break;
          case 4:
          case 5:
              this.seasonColor = this.fallColor;
          break;
          case 6:
            if(this.date.getDay() < 22){
              this.seasonColor = this.fallColor;
            } else {
              this.seasonColor = this.winterColor;
            }
            break;
          case 7:
          case 8:
              this.seasonColor = this.winterColor;
          break;
          case 9:
            if(this.date.getDay() < 22){
              this.seasonColor = this.winterColor;
            } else {
              this.seasonColor = this.springColor;
            }
            break;
          case 10: 
          case 11:
              this.seasonColor = this.springColor;
          break;
      }

      this.el.nativeElement.style.color = this.seasonColor;

   }

}
