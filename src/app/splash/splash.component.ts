import { Component, OnInit } from '@angular/core';
import { SplashOnOffService } from '../shared/services/splash-on-off.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  showSplash: boolean = false;

  constructor(private splashOnOffService: SplashOnOffService) { 
    splashOnOffService.onOff$.subscribe(
      position => {
        this.showSplash = position;
    });
  }

  ngOnInit(): void {
  }

}
