import { Observable } from "rxjs";
import { load, loadWithFetch } from "./loader";

const URL = 'http://tc1.sms.fortaleza.ce.gov.br/simda/dengue/';
//let params = { mapa: true, ano: 2016, mes: 0, sem_pri: 201652, classifin: 0, criterio: 0, evolucao: 0, regional: 0, id_bairro: 0, id_unidade: 0 }
const today = new Date();
const YEAR = today.getFullYear();
let params = {
    mapa: true,
    ano: YEAR,
    sem_pri: YEAR + '01'
}
const WEEKS = 3;
const completeUrl = URL + 'mapaJSON?mapa=' + params.mapa + '&ano=' + params.ano + '&sem_pri=' + params.ano;
function showCollection(request) {
    request
        .subscribe(a => console.log(a),
        e => console.log(`error: ${e}`),
        () => console.log("complete!"))
}
const listRequest = Array
    .from(new Array(WEEKS), (x, i) => i + 1)
    .map(number => number <= 99 ? ('0' + number).slice(-2) : number)
    .map(value => completeUrl + value);

var source = Observable
    .from(listRequest)
    .map(load)
    .subscribe(showCollection,
    e => console.log(`error: ${e}`),
    () => console.log("complete!"));
