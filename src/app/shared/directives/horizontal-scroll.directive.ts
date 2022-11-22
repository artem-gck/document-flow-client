import { Directive, ElementRef, HostListener } from '@angular/core';
import { delay } from 'rxjs';

@Directive({
  selector: '[appHorizontalScroll]'
})
export class HorizontalScrollDirective {

  constructor(private element: ElementRef) {}

  @HostListener("wheel", ["$event"])
  public onScroll(event: WheelEvent) {
    const speed: number = 30;

    if (event.deltaY > 0)
      this.element.nativeElement.scrollLeft += speed;
    else
    this.element.nativeElement.scrollLeft -= speed;
  }

}
