import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AuthNavbarComponent} from "./auth-navbar/auth-navbar.component";

import {BodyComponent} from "./body/body.component";
import {CardLineChartComponent} from "./card-line-chart/card-line-chart.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {FooterSmallComponent} from "./footer-small/footer-small.component";


const routes: Routes = [
    {
        path: "",
        component: BodyComponent,
        children: [
            {path: "dashboard", component: DashboardComponent},
            {
                path: "tides", 
                loadChildren: () => import('../tides/tides.module').then(m => m.TidesModule)
            },
            {path: "", redirectTo: "dashboard", pathMatch: "full"},
        ],
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        BodyComponent,
        DashboardComponent,
        AuthNavbarComponent,
        CardLineChartComponent,
        FooterSmallComponent
    ],
    exports: [RouterModule],
})
export class SharedRoutingModule { }
