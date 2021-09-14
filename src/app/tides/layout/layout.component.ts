import {Component, OnInit} from "@angular/core";
import {Store} from "@ngxs/store";
import {environment} from "src/environments/environment";
import {FetchTideLocations, SetTidesLocation} from "../state/tides.actions";

@Component({
    selector: 'app-tides-layout',
    templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {

    constructor(private store: Store) {}
    
    ngOnInit() { 
        this.store.dispatch(new FetchTideLocations());
        this.store.dispatch(new SetTidesLocation(environment.defaultLocation));
    }
}