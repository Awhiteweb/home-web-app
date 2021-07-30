import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {LayoutComponent} from "./layout/layout.component";
import {TidesRoutingModule} from "./tides.routing.module";
import {TidesService} from "./tides.services";
import {TideStates} from "./tides.state";
import {ViewLocationsComponent} from "./view-locations/view-locations.component";
import {ViewTidesComponent} from "./view-tides/view-tides.component";

@NgModule({
    exports: [],
    imports: [
        CommonModule,
        TidesRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        LayoutComponent,
        ViewLocationsComponent,
        ViewTidesComponent
    ],
    providers: [
        TideStates,
        TidesService
    ]
})
export class TidesModule { }