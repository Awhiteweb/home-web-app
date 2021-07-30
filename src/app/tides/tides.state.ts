import {Injectable} from "@angular/core";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {environment} from "src/environments/environment";
import {TideLocations, Tides} from "./tides.entites";
import {TidesService} from "./tides.services";

interface ITideState {
    [key: string]: BehaviorSubject<Tides>;
}

@Injectable()
export class TideStates {
    private state: ITideState = {};
    private locations$: BehaviorSubject<TideLocations> = new BehaviorSubject<TideLocations>([]);
    private currentTides$: BehaviorSubject<Tides> = new BehaviorSubject<Tides>([]);
    private currentLocation$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private loadingTidesState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor(private tidesService: TidesService) {
        this.setLocation(environment.defaultLocation);
        this.tidesService.getLocations$().pipe(
            tap((locations) => this.locations$.next(locations)),
            tap(() => console.log("pulled locations"))
        ).subscribe();
    }

    public setLocation(locationId: string): void {
        this.loadingTidesState$.next(true);
        this.currentLocation$.next(locationId);
        this.checkTide(locationId);
    }

    public get getLocations$(): Observable<TideLocations> {
        return this.locations$.asObservable();
    }

    public hasTides(locationId: string): boolean {
        if(!!this.state[locationId]) {
            return this.state[locationId].value.length > 0;
        }
        this.state[locationId] = new BehaviorSubject<Tides>([]);
        return false;
    }

    public get getCurrentLocation$(): Observable<string> {
        return combineLatest([this.currentLocation$, this.locations$]).pipe(
            map(([locationId, locations]) => {
                const current = locations.filter(l => l.id == locationId)[0];
                return !!current ? current.name : locationId;
            }));
    }

    public get getTides$(): Observable<Tides> {
        return this.currentTides$.asObservable().pipe(
            tap(() => this.loadingTidesState$.next(false))
        );
    }

    public get isLoadingTides$(): Observable<boolean> {
        return this.loadingTidesState$.asObservable();
    }

    private checkTide(locationId: string): void {
        if(!this.hasTides(locationId)) {
            this.tidesService.getTides$(locationId).pipe(
                tap((tides: Tides) => this.state[locationId].next(tides)),
                tap(() => this.setCurrentTide(locationId)),
                tap(() => `pulled tides for ID: ${locationId}`)
            ).subscribe()
        }
        else {
            this.setCurrentTide(locationId);
        }
    }

    private setCurrentTide(locationId: string) {
        this.currentTides$.next(this.state[locationId].value);
    }
}