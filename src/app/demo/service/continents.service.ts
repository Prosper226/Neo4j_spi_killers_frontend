import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ContinentModel} from "../model/continent.model";

@Injectable()
export class ContinentsService {

    constructor(private http: HttpClient) { }
    public resourceUrl = `${environment.api}/continents`;

    getAllContinents(): Observable<ContinentModel[]> {
        console.log(this.resourceUrl)
        return this.http.get<ContinentModel[]>(this.resourceUrl);
    }

}
