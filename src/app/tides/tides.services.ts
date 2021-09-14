import { HttpErrorResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {format, parseISO} from 'date-fns';
import {Observable, throwError} from "rxjs";
import {catchError, delay, delayWhen, map, switchMap} from "rxjs/operators";
import {environment} from "src/environments/environment";
import {ApiService} from "../shared/services/api.service";
import {ITideLocationServerResponse, ITideServerResponse, TideLocations, Tides} from "./tides.entites";

@Injectable()
export class TidesService {

    constructor(private apiService: ApiService) { }

    getLocations$(): Observable<TideLocations> {
        return this.apiService.get<ITideLocationServerResponse>(`${environment.assetsUri}/${this.year}/locations`).pipe(
            map((result: ITideLocationServerResponse): TideLocations => result.features.map(r => ({
                    id: r.properties.Id,
                    name: r.properties.Name
                }))));
        
    }

    getTides$(locationId: string): Observable<Tides> {
        return this.fetchTides$(locationId);
    }

    private get year(): string {
        return format(new Date(), 'yyyy');
    }

    private get month(): string {
        return format(new Date(), 'MM');
    }

    private get day(): string {
        return format(new Date(), 'dd');
    }

    private getServerErrorMessage(error: HttpErrorResponse): string {
        switch (error.status) {
            case 404: {
                return `Not Found: ${error.message}`;
            }
            case 403: {
                return `Access Denied: ${error.message}`;
            }
            case 500: {
                return `Internal Server Error: ${error.message}`;
            }
            default: {
                return `Unknown Server Error: ${error.message}`;
            }
        }
    }

    private fetchTides$(locationId: string): Observable<Tides> {
        return this.apiService.get<ITideServerResponse[]>(`${environment.assetsUri}/${this.year}/${this.month}/${this.day}/${locationId}`).pipe(
            map((result: ITideServerResponse[]): Tides => result.map(r => ({
                dateTime: parseISO(r.DateTime),
                eventType: r.EventType,
                height: r.Height
            }))),
            catchError((error: any, caught: Observable<Tides>) => {
                if(error.error instanceof ErrorEvent) {
                    console.error(error.error.message);
                }
                else if(error.status == 403 || error.status == 404) {
                    console.log("need to call lambda to get new data");
                    return this.updateTides$(locationId);
                }
                return throwError(this.getServerErrorMessage(error));
            }));
    }

    private updateTides$(locationId: string): Observable<Tides> {
        return this.apiService.get<boolean>(`${environment.lambdaUri}/tides/${locationId}`).pipe(
            delay(1000),
            switchMap((result) => this.fetchTides$(locationId))
        );
    }
}