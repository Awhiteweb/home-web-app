import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {patch} from "@ngxs/store/operators";
import {isBefore} from "date-fns";
import {map, tap} from "rxjs/operators";
import {environment} from "src/environments/environment";
import {ITide, ITideLocation, TideLocations, Tides} from "../tides.entites";
import {TidesService} from "../tides.services";
import {FetchTideLocations, FetchTides, SetTidesLocation} from "./tides.actions";

export interface TidesStateModel {
    currentLocation: string;
    locations: TideLocations;
    tides: Tides;
}

@State<TidesStateModel>({
    name: 'tides',
    defaults: {
        currentLocation: '',
        locations: [],
        tides: []
    }
})
@Injectable()
export class TidesState {
    constructor(private service: TidesService) {}

    @Selector()
    static currentLocation(state: TidesStateModel) {
        return state.locations.filter(l => l.id == state.currentLocation)[0].name;
    }

    @Selector()
    static tides(state: TidesStateModel) {
        return state.tides;
    }

    @Selector()
    static locations(state: TidesStateModel) {
        return state.locations;
    }

    @Action(FetchTideLocations)
    fetchLocations(ctx: StateContext<TidesStateModel>) {
        const state = ctx.getState();
        return this.service.getLocations$().pipe(
            map((locations: TideLocations) => locations.sort((a: ITideLocation, b: ITideLocation) => 
            a.name > b.name ? 1 : -1)),
            tap((locations: TideLocations) => {
                console.log("patching locations");
                ctx.setState(patch({locations}));
            })
        );
    }

    @Action(FetchTides)
    fetchTides(ctx: StateContext<TidesStateModel>, {locationId}: FetchTides) {
        const state = ctx.getState();
        return this.service.getTides$(locationId).pipe(
            map((tides: Tides) => tides.sort((a: ITide, b: ITide) =>
                isBefore(a.dateTime, b.dateTime) ? -1 : 1)),
            tap((tides: Tides) => {
                console.log(`patching tides: ${locationId}`);
                ctx.setState(patch({tides}));
            })
        );
    }

    @Action(SetTidesLocation)
    setTidesLocation(ctx: StateContext<TidesStateModel>, {locationId}: SetTidesLocation) {
        const state = ctx.getState();
        console.log(`patching location: ${locationId}`);
        ctx.setState(patch({currentLocation: locationId}));
        return ctx.dispatch(new FetchTides(locationId));
    }
}