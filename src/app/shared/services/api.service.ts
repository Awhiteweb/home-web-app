import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, OperatorFunction} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private httpClient: HttpClient) { }

    public get<T>(route: string): Observable<T> {
        return this.httpClient.get<T>(route);
    }

    public post<T>(route: string, body: any): Observable<T> {
        return this.httpClient.post<T>(route, body);
    }

    public put<T>(route: string, body: any): Observable<T> {
        return this.httpClient.put<T>(route, body);
    }

    public delete<T>(route: string): Observable<T> {
        return this.httpClient.delete<T>(route);
    }
}