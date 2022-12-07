import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplashOnOffService {

  private onOffSource = new Subject<boolean>();

  onOff$ = this.onOffSource.asObservable()

  switchOnOff(position: boolean) {
    this.onOffSource.next(position);
  }
}
