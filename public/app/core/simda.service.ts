import { Injectable } from '@angular/core';

@Injectable()
export class SimdaService {
    //let params = { mapa: true, ano: 2016, mes: 0, sem_pri: 201652, classifin: 0, criterio: 0, evolucao: 0, regional: 0, id_bairro: 0, id_unidade: 0 }
    today: Date;
    params: { ano: number };
    completeUrl: string;
    URL: String;
    WEEKS = 52;

    getListRequests() {
        this.today = new Date();
        const YEAR = this.today.getFullYear();
        this.params = {
            ano: 2016
        }
        this.URL = 'http://tc1.sms.fortaleza.ce.gov.br/simda/dengue/';

        this.completeUrl = this.URL + 'mapaJSON?sem_pri=' + this.params.ano;

        const listRequest = Array
            .from(new Array(this.WEEKS), (x, i) => i + 1)
            .map(number => number <= 99 ? ('0' + number).slice(-2) : number)
            .map(value => this.completeUrl + value + '&key=0');
        return listRequest;
    }

}