import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {LayoutComponent} from "./layout/layout.component";
import {TidesRoutingModule} from "./tides.routing.module";
import {ViewLocationsComponent} from "./view-locations/view-locations.component";
import {ViewTidesComponent} from "./view-tides/view-tides.component";

@NgModule({
    exports: [],
    imports: [
        TidesRoutingModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        LayoutComponent,
        ViewLocationsComponent,
        ViewTidesComponent
    ]
})
export class TidesModule { }