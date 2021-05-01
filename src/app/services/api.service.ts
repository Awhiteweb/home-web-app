import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, OperatorFunction } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private httpClient: HttpClient) {}

    public get<K, R>(route: string, mapper: OperatorFunction<K,R>): Observable<R> {
        return this.httpClient.get(route).pipe(
            mapper
        );
    }

    public post<K, R>(route: string, body: any, mapper: OperatorFunction<K,R>): Observable<R> {
        return this.httpClient.post(route, body).pipe(
            mapper
        );
    }
}