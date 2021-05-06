import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {ViewTidesComponent} from "./view-tides/view-tides.component";

const routes: Routes = [
    {
        path: 'view',
        component: ViewTidesComponent
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ViewTidesComponent
    ]
})
export class TidesModule { }