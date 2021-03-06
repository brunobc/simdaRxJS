import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IFeature } from '../shared/interfaces';

@Injectable()
export class DataService {

    baseUrl: string = '/api/features';

    constructor(private http: Http) {

    }

    getJSON(): Observable<any> {
        return this.http.get("../dbs/2019/chikungunya/25.json")
                        .map((res:any) => res.json())
                        .catch(this.handleError);

    }

    getFeatures(): Observable<IFeature[]> {
        console.log('getFeature data service');
        return this.http.get(this.baseUrl)
            .map((res) => {
                console.log('getFeature data service res: ' + res);

                let featuresByWeek = res.json();
                console.log(featuresByWeek);
                let data = {
                    elements: {},
                    temporalfields: { position: {} }
                };
                featuresByWeek.map(featureByWeek => {
                    featureByWeek.features.map(feature => {
                        let positionData = [];
                        positionData.push({
                            time: featureByWeek.year + featureByWeek.week,
                            data: {
                                x: feature.latitude,
                                y: feature.longitude
                            }

                        });
                        data.temporalfields.position[feature._id] = {};
                        data.temporalfields.position[feature._id] = positionData;
                    });
                });
                let id = "5923acc29342ea1aff430d70";
                console.log(data.temporalfields.position[id]);
                return data;
            })
            .catch(this.handleError);
    }

    insertFeature(feature: IFeature): Observable<IFeature> {
        console.log(feature);
        return this.http.post(this.baseUrl + '/list', feature)
            .map((res: Response) => {
                console.log(res);
                const data = res.json();
                console.log('insertFeature status: ' + data.status);
                return data.feature;
            })
            .catch(this.handleError);
    }

    updateFeature(feature: IFeature): Observable<IFeature> {
        return this.http.put(this.baseUrl + '/' + feature._id, feature)
            .map((res: Response) => {
                const data = res.json();
                console.log('updateFeature status: ' + data.status);
                return data.feature;
            })
            .catch(this.handleError);
    }

    deleteFeature(id: string): Observable<boolean> {
        return this.http.delete(this.baseUrl + '/' + id)
            .map((res: Response) => res.json().status)
            .catch(this.handleError);
    }

    //Not used but could be called to pass "options" (3rd parameter) to
    //appropriate POST/PUT/DELETE calls made with http
    getRequestOptions() {
        const csrfToken = ''; //would retrieve from cookie or from page
        const options = new RequestOptions({
            headers: new Headers({ 'x-xsrf-token': csrfToken })
        });
        return options;
    }

    private handleError(error: any) {
        console.error('server error:', error);
        if (error instanceof Response) {
            let errMessage = '';
            try {
                errMessage = error.json().error;
            } catch (err) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
            // Use the following instead if using lite-server
            //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }

}
