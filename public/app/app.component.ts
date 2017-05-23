import { Component, AfterViewInit } from '@angular/core';
import { DataService } from './core/data.service';
import { SimdaService } from './core/simda.service';
import { IFeature } from './shared/interfaces';

import { Observable } from "rxjs/Rx";
import { load, Base64 } from './core/loader';

@Component({
  moduleId: module.id,
  selector: 'app-container',
  templateUrl: 'app.component.html'
})
export class AppComponent implements AfterViewInit {
  years: Object[];
  iFeature: IFeature;
  num: number;

  constructor(private dataService: DataService,
    private simdaService: SimdaService) {
    this.initYears();
    this.num = 0;
  }

  ngAfterViewInit() {
    const listRequest = this.simdaService.getListRequests();
    var source = Observable
      .from(listRequest)
      .map(load)
      .subscribe(req => {
        return this.showCollection(req);
      },
      e => console.log(`error: ${e}`),
      () => console.log("complete!"));
  }


  showCollection(request) {
    request
      .subscribe(res => {

        this.iFeature = res;
        console.log(this.iFeature.features);
        console.log(typeof this.iFeature.features);

        this.iFeature.features =
          this.iFeature.features
            .map(function (value) {
              const lon = value.geometry.coordinates[0].substring(0, 16);
              const lat = value.geometry.coordinates[1].substring(1, 17);
              return {
                latitude: parseFloat((Base64.decode(lat))),
                longitude: parseFloat((Base64.decode(lon)))
              };
            });
        this.iFeature.type = 'DENGUE';
        const index = res.url.indexOf('sem_pri=');
        this.iFeature.year = res.url.substring(index + 8, index + 12);
        this.iFeature.week = res.url.substring(index + 12, index + 14);
        this.num += 1;
        console.log(this.iFeature);

        this.dataService.insertFeature(this.iFeature)
          .subscribe((features: IFeature) => {
            if (features) {
              console.log(features);
            }
          })
      },
      e => console.log(`error: ${e}`),
      () => console.log("complete!"))
  }

  atualizar(year) {
    console.log(year);
  }

  private initYears() {
    this.dataService.getFeatures().subscribe((features: IFeature[]) => {
      console.log(features);
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
