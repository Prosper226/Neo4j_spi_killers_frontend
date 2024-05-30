import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ContinentModel} from "../model/continent.model";
import {ConvictionModel} from "../model/conviction.model";

@Injectable()
export class ConvictionsService {

    constructor(private http: HttpClient) { }
    public resourceUrl = `${environment.api}/convictions`;

    getAllConvictions(): Observable<ConvictionModel[]> {
        console.log(this.resourceUrl)
        return this.http.get<ConvictionModel[]>(this.resourceUrl);
    }

}
