import { Injectable } from '@angular/core';

@Injectable()
export class SimdaService {
    //let params = { mapa: true, ano: 2016, mes: 0, sem_pri: 201652, classifin: 0, criterio: 0, evolucao: 0, regional: 0, id_bairro: 0, id_unidade: 0 }
    today: Date;
    params: { ano: number };
    completeUrl: string;
    URL: string;
    partial: string;
    WEEKS = 52;

    // http://g1.globo.com/ceara/noticia/2016/01/numero-de-casos-de-dengue-cresce-506-em-fortaleza-em-2015.html
    // Fortaleza registrou 26.172 casos em 2015 e 5.170, em 2014
    

    getListRequests() {
        this.today = new Date();
        const YEAR = this.today.getFullYear();
        this.params = {
            ano: 2015
        }
        this.URL = 'http://tc1.sms.fortaleza.ce.gov.br/simda/dengue/mapaJSON?mapa=true&ano=' + this.params.ano + '&mes=&';
        this.partial = '&classifinold=&criterio=&evolucao=&regional=&id_bairro=&id_unidade=';
        // http://tc1.sms.fortaleza.ce.gov.br/simda/dengue/mapaJSON?mapa=true&ano=2016&mes=&sem_pri=201646&classifin=&criterio=&evolucao=&regional=&id_bairro=&id_unidade=&key=9
        // http://tc1.sms.fortaleza.ce.gov.br/simda/dengue/mapaJSON?mapa=true&ano=2012&mes=&sem_pri=&classifinold=&criterio=&evolucao=&regional=&id_bairro=&id_unidade=&key=3
        // http://tc1.sms.fortaleza.ce.gov.br/simda/dengue/mapaJSON?mapa=true&ano=2012&mes=&sem_pri=201202&classifinold=&criterio=&evolucao=&regional=&id_bairro=&id_unidade=&key=8
        this.completeUrl = this.URL + 'sem_pri=' + this.params.ano;

        const listRequest = Array
            .from(new Array(this.WEEKS), (x, i) => i + 1)
            .map(number => number <= 99 ? ('0' + number).slice(-2) : number)
            .map(value => this.completeUrl + value + '&key=0');
        return listRequest;
    }

}