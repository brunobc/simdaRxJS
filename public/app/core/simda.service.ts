import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Rx";
import { load } from './loader';

@Injectable()
export class SimdaService {
    //let params = { mapa: true, ano: 2016, mes: 0, sem_pri: 201652, classifin: 0, criterio: 0, evolucao: 0, regional: 0, id_bairro: 0, id_unidade: 0 }
    today: Date;
    params: { ano: number };
    completeUrl: string;
    URL: String;
    WEEKS = 2;

    showCollection(request) {
        request
            .subscribe(a => console.log(a),
            e => console.log(`error: ${e}`),
            () => console.log("complete!"))
    }
    getFeatures() {
        this.today = new Date();
        const YEAR = this.today.getFullYear();
        this.params = {
            ano: YEAR
        }
        this.URL = 'http://tc1.sms.fortaleza.ce.gov.br/simda/dengue/';

        this.completeUrl = this.URL + 'mapaJSON?sem_pri=' + this.params.ano;

        const listRequest = Array
            .from(new Array(this.WEEKS), (x, i) => i + 1)
            .map(number => number <= 99 ? ('0' + number).slice(-2) : number)
            .map(value => this.completeUrl + value + '&key=0');
        console.log(listRequest);

        var source = Observable
            .from(listRequest)
            .map(load)
            .subscribe(this.showCollection,
            e => console.log(`error: ${e}`),
            () => console.log("complete!"));
    }

}