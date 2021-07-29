import {Component, OnInit} from "@angular/core";
import {Observable, of} from "rxjs";
import {map, tap} from "rxjs/operators";
import {TideLocations} from "../tides.entites";
import {TideStates} from "../tides.state";

@Component({
    selector: 'app-tides-locations',
    templateUrl: './view-locations.component.html'
})
export class ViewLocationsComponent implements OnInit {

    locationList$!: Observable<TideLocations>;

    constructor(private tidesState: TideStates) { }

    ngOnInit() {
        this.locationList$ = this.tidesState.getLocations$.pipe(
            map((x) => x.sort((a, b) => a.name > b.name ? 1 : -1)),
            tap((x) => console.log(`locations: ${x.length}`)));
    }

    viewLocationTides(locationId: string): void {
        this.tidesState.setLocation(locationId);
    }
}