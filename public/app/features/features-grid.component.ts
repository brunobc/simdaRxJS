import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { IFeature } from '../shared/interfaces';

@Component({ 
  moduleId: module.id,
  selector: 'features-grid', 
  templateUrl: 'features-grid.component.html',
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class FeaturesGridComponent implements OnInit {

  @Input() features: IFeature[] = [];

  constructor() { }
   
  ngOnInit() {

  }

}
