import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {patch} from "@ngxs/store/operators";
import {isBefore} from "date-fns/isBefore";
import {map, tap} from "rxjs/operators";
import {ITide, ITideLocation, TideLocations, Tides} from "../tides.entites";
import {TidesService} from "../tides.services";
import {FetchTideLocations, FetchTides, SetTidesLocation} from "./tides.actions";
import { environment } from "src/environments/environment";

export interface TidesStateModel {
    currentLocation: ITideLocation;
    locations: TideLocations;
    tides: Tides;
}

@State<TidesStateModel>({
    name: 'tides',
    defaults: {
        currentLocation: {id: environment.defaultLocation, name: ''},
        locations: [],
        tides: []
    }
})
@Injectable()
export class TidesState {
    constructor(private service: TidesService) {}

    @Selector()
    static currentLocation(state: TidesStateModel) {
        return state.currentLocation;
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
                ctx.dispatch(new SetTidesLocation(ctx.getState().currentLocation.id))
            })
        );
    }

    @Action(FetchTides)
    fetchTides(ctx: StateContext<TidesStateModel>) {
        const state = ctx.getState();
        return this.service.getTides$(state.currentLocation.id).pipe(
            map((tides: Tides) => tides.sort((a: ITide, b: ITide) =>
                isBefore(a.dateTime, b.dateTime) ? -1 : 1)),
            tap((tides: Tides) => {
                console.log(`patching tides: ${state.currentLocation}`);
                ctx.setState(patch({tides}));
            })
        );
    }

    @Action(SetTidesLocation)
    setTidesLocation(ctx: StateContext<TidesStateModel>, {locationId}: SetTidesLocation) {
        const state = ctx.getState();
        console.log(`patching location: ${locationId}`);
        const location = state.locations.filter(l => l.id == locationId)[0];
        ctx.setState(patch({currentLocation: location}));
        return ctx.dispatch(new FetchTides());
    }
}