import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'main-header',
  styleUrls: [ './main-header.component.css' ],
  templateUrl: './main-header.html',
  providers: [ NgbCarouselConfig ]
})
export class HeaderComponent {

  constructor(config: NgbCarouselConfig){
    config.interval = 10000;
    config.wrap = true;
  }

}
