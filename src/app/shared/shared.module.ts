import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BodyComponent} from './body/body.component';
import {AuthNavbarComponent} from './auth-navbar/auth-navbar.component';
import {FooterSmallComponent} from './footer-small/footer-small.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CardLineChartComponent} from './card-line-chart/card-line-chart.component';
import {PagesDropdownComponent} from './pages-dropdown/pages-dropdown.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BodyComponent,
        AuthNavbarComponent,
        FooterSmallComponent,
        DashboardComponent,
        CardLineChartComponent,
        PagesDropdownComponent
    ],
    exports: [
        BodyComponent,
        CardLineChartComponent
    ]
})
export class SharedModule { }