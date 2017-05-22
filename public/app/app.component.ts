import { Component, AfterViewInit } from '@angular/core';
import { DataService } from './core/data.service';
import { SimdaService } from './core/simda.service';
import { IFeature } from './shared/interfaces';

@Component({
  moduleId: module.id,
  selector: 'app-container',
  templateUrl: 'app.component.html'
})
export class AppComponent implements AfterViewInit {
  years: Object[];
  features: IFeature[];

  constructor(private dataService: DataService,
    private simdaService: SimdaService) {
    this.initYears();
  }

  ngAfterViewInit() {
    this.simdaService.getFeatures();
  }

  atualizar(year) {
    console.log(year);
  }

  private initYears() {
    this.dataService.getFeatures().subscribe((features: IFeature[]) => {
      console.log(features);
      this.features = features;
    });
    this.years = [];
    for (var index = 0; index < 11; index++) {
      this.years.push({
        data: (2007 + index),
        casos: (100 + index)
      });
    }
  }
}
