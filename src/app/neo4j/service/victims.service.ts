import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ContinentModel} from "../model/continent.model";
import {KillerModel} from "../model/killer.model";

@Injectable()
export class KillersService {

    constructor(private http: HttpClient) { }
    public resourceUrl = `${environment.api}`;

    getAllKillers(): Observable<KillerModel[]> {
        return this.http.get<KillerModel[]>(`${this.resourceUrl}/killers`);
    }

    getAllKillersForHome(): Observable<KillerModel[]> {
        return this.http.get<KillerModel[]>(`${this.resourceUrl}/killers/with-photos`);
    }

    getKillerById(id: string): Observable<any> {
        return this.http.get<KillerModel>(`${this.resourceUrl}/killers/${id}`);
    }

    deleteKiller(killerId?: string): Observable<void> {
        return this.http.delete<void>(`${this.resourceUrl}/killers/${killerId}`);
    }

    createKiller(classe: KillerModel): Observable<KillerModel> {
        return this.http.post<KillerModel>(`${this.resourceUrl}/killers`, classe);
    }

    updateKiller(classe: KillerModel): Observable<KillerModel> {
        console.log(classe)
        return this.http.put<KillerModel>(`${this.resourceUrl}/killers/${classe.id}`, classe);
    }
}
