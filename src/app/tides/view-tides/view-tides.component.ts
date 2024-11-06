import {AfterViewInit, Component, OnInit} from "@angular/core";
// import {Chart, ChartConfiguration, ScatterDataPoint} from "chart.js";
import {map, Observable} from "rxjs";
import {Tides} from "../tides.entites";
import {Store} from "@ngxs/store";
import {TidesState} from "../state/tides.state";
import {FetchTides} from "../state/tides.actions";

@Component({
    selector: 'app-tides-view',
    templateUrl: './view-tides.component.html'
})
export class ViewTidesComponent implements OnInit, AfterViewInit {
    tides$: Observable<Tides>;
    location$: Observable<string>;

    constructor(private store: Store) {
        this.tides$ = store.select(TidesState.tides);
        this.location$ = store.select(TidesState.currentLocation).pipe(
            map(l => l.name)
        );
    }

    ngOnInit() { 
        this.store.dispatch(new FetchTides());
    }

    ngAfterViewInit() { }
}