import { Observable } from "rxjs";
import { load, loadWithFetch } from "./loader";

const URL = "http://tc1.sms.fortaleza.ce.gov.br/simda/dengue/mapaJSON?mapa=true&ano=2016&sem_pri=2016";
const WEEKS = 3;
function showCollection(request) {
    request
        .subscribe(a => console.log(a),
        e => console.log(`error: ${e}`),
        () => console.log("complete!"))
}
const listRequest = Array
    .from(new Array(WEEKS), (x, i) => i + 1)
    .map(number => number <= 99 ? ('0' + number).slice(-2) : number)
    .map(value => URL + value);

var source = Observable
    .from(listRequest)
    .map(load)
    .subscribe(showCollection,
    e => console.log(`error: ${e}`),
    () => console.log("complete!"));
