import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {CountryModel} from "../model/country.model";
import {ContinentModel} from "../model/continent.model";

@Injectable()
export class CountryService {

    constructor(private http: HttpClient) { }

    public resourceUrl = `${environment.api}/countries`;

    getAllCountries(): Observable<CountryModel[]> {
        console.log(this.resourceUrl)
        return this.http.get<CountryModel[]>(this.resourceUrl);
    }

}
