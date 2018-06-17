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
    // this.initYears();
    // this.num = 0;
  }

  ngAfterViewInit() {
    this.dataService.getJSON().subscribe(data => {
      console.log(data);
      this.showCollection(data);
    }, error => console.log(error));
    //   const listRequest = this.simdaService.getListRequests();
    //   var source = Observable
    //     .from(listRequest)
    //     .map(load)
    //     .subscribe(req => {
    //       return this.showCollection(req);
    //     },
    //     e => console.log(`error: ${e}`),
    //     () => console.log("complete!"));
  }


  showCollection(res) {
    this.iFeature = res;
    console.log(this.iFeature.features);
    console.log(typeof this.iFeature.features);

    let coordinates = '';
    for (let prop in this.iFeature.features[0].geometry) {
      if (prop !== 'type' && prop !== 'coordinates')
        coordinates = prop;
    }
    console.log('coordinates: ' + coordinates);
    const keyy = 8;
    // this.iFeature.features.map( function(value) {
    //   var lat =   value.geometry.gg[0].substring(keyy,keyy+  parseInt(Base64.decode(value.geometry.gg[0].substring(28,32))) )
    //   var lon =   value.geometry.gg[1].substring(keyy+1,keyy+1+ parseInt(Base64.decode(value.geometry.gg[1].substring(28,32))) )
         
    //    value.geometry.coordinates[0]  = parseFloat((Base64.decode(lat)));
    //    value.geometry.coordinates[1]  = parseFloat((Base64.decode(lon)));
    //   });
    this.iFeature.features =
      this.iFeature.features
        .map(function (value) {
          const lon = value.geometry[coordinates][1].substring(0, 16);
          const lat = value.geometry[coordinates][0].substring(1, 17);

          // console.log(parseFloat(Base64.decode(value.geometry[coordinates][1].substring(0, 16))));
          // console.log(parseFloat(Base64.decode(value.geometry[coordinates][1].substring(1, 17))));
          // console.log(parseFloat(Base64.decode(value.geometry[coordinates][1].substring(2, 18))));
          // console.log(parseFloat(Base64.decode(value.geometry[coordinates][1].substring(3, 19))));

          return {
            latitude: parseFloat((Base64.decode(lat))),
            longitude: parseFloat((Base64.decode(lon)))
          };
        });
    this.iFeature.type = 'CHIKUNGUNYA';
    const url = 'http://tc1.sms.fortaleza.ce.gov.br/simda/chikungunya/mapaJSON?mapa=true&ano=2018&mes=&sem_pri=201824&classifin=&criterio=&evolucao=&regional=&id_bairro=&id_unidade=&key=0&anomapa=';
    const index = url.indexOf('sem_pri=');
    this.iFeature.year = url.substring(index + 8, index + 12);
    this.iFeature.week = url.substring(index + 12, index + 14);
    this.num += 1;
    console.log(this.iFeature);
    console.log(url);

     this.dataService.insertFeature(this.iFeature)
       .subscribe((features: IFeature) => {
         if (features) {
           console.log(features);
          }
        })
  }

  atualizar(year) {
    console.log(year);
  }

  private initYears() {
    this.dataService.getFeatures().subscribe((features: IFeature[]) => {
      //console.log(features);
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
