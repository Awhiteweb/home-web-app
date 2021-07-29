import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, OperatorFunction} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private httpClient: HttpClient) { }

    public get<T, R>(route: string, mapper: OperatorFunction<T, R>): Observable<R> {
        return this.httpClient.get<T>(route).pipe(mapper);
    }

    public post<T, R>(route: string, body: any, mapper: OperatorFunction<T, R>): Observable<R> {
        return this.httpClient.post<T>(route, body).pipe(mapper);
    }
}