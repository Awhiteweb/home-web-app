import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {NgxsModule} from "@ngxs/store";
import {LayoutComponent} from "./layout/layout.component";
import {TidesState} from "./state/tides.state";
import {TidesRoutingModule} from "./tides.routing.module";
import {TidesService} from "./tides.services";
import {ViewLocationsComponent} from "./view-locations/view-locations.component";
import {ViewTidesComponent} from "./view-tides/view-tides.component";

@NgModule({
    exports: [],
    imports: [
        CommonModule,
        TidesRoutingModule,
        FormsModule,
        NgxsModule.forFeature([TidesState])
    ],
    declarations: [
        LayoutComponent,
        ViewLocationsComponent,
        ViewTidesComponent
    ],
    providers: [
        TidesService
    ]
})
export class TidesModule { }