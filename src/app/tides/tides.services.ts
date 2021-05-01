import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiService } from "../services/api.service";
import { IServerResponse, Tides } from "./tides.entites";
import { isSameDay } from 'date-fns';

export class TidesService {

    private tidesState$ = new BehaviorSubject<Tides>([]);

    constructor(private apiService: ApiService) {}

    list(): void {
        if(!this.hasCurrentTides) {
            this.apiService.get('', map((result: IServerResponse[]) => {
                return result.map(r => ({
                    eventType: r.EventType,
                    dateTime: r.DateTime,
                    height: r.Height
                }));
            })).subscribe((result) => {
                this.tidesState$.next(result);
            });
        }
    }

    get tides$(): Observable<Tides> {
        return this.tidesState$.asObservable();
    }

    get hasCurrentTides(): boolean {
        const state = this.tidesState$.value;
        if(state.length == 0) {
            return false;
        }
        if(isSameDay(state[0].dateTime, new Date())) {
            return true;
        }
        return false;
    }
}