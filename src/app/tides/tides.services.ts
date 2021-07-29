import {Injectable} from '@angular/core';
import {format, parseISO} from 'date-fns';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "src/environments/environment";
import {ApiService} from "../common/services/api.service";
import {ITideLocationServerResponse, ITideServerResponse, TideLocations, Tides} from "./tides.entites";
// import {TidesModule} from './tides.module';

@Injectable({
    providedIn: 'root'
})
export class TidesService {

    constructor(private apiService: ApiService) { }

    getLocations$(): Observable<TideLocations> {
        return this.apiService.get(`${environment.assetsUri}/${this.year}/locations`, map((result: ITideLocationServerResponse): TideLocations => {
            return result.features.map(r => ({
                id: r.properties.Id,
                name: r.properties.Name
            }));
        }));
    }

    getTides$(locationId: string): Observable<Tides> {
        return this.apiService.get(`${environment.assetsUri}/${this.year}/${this.month}/${this.day}/${locationId}`, map((result: ITideServerResponse[]): Tides => {
            return result.map(r => ({
                dateTime: parseISO(r.DateTime),
                eventType: r.EventType,
                height: r.Height
            }));
        }));
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
}