import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {
    CardBarChartComponent,
    CardLineChartComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    IndexDropdownComponent,
    NotificationDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    UserDropdownComponent,
    FooterAdminComponent,
    FooterComponent,
    FooterSmallComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AdminNavbarComponent,
    AuthNavbarComponent,
    IndexNavbarComponent,
    SidebarComponent
} from "./components";

import {
    DashboardComponent,
    IndexComponent,
    LandingComponent,
    MapsComponent,
    ProfileComponent,
    SettingsComponent,
    TablesComponent
} from './views';

import {
    AdminComponent,
    AuthComponent
} from './layouts';

import {
    LoginComponent,
    ResetPasswordComponent
} from './auth';
import {ReactiveFormsModule} from "@angular/forms";

const components = [
    CardBarChartComponent,
    CardLineChartComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    IndexDropdownComponent,
    NotificationDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    UserDropdownComponent,
    FooterAdminComponent,
    FooterComponent,
    FooterSmallComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AdminNavbarComponent,
    AuthNavbarComponent,
    IndexNavbarComponent,
    SidebarComponent,
    /* views */
    DashboardComponent,
    IndexComponent,
    LandingComponent,
    MapsComponent,
    ProfileComponent,
    SettingsComponent,
    TablesComponent,
    /* layouts */
    AdminComponent,
    AuthComponent,
    /* auth */
    LoginComponent,
    ResetPasswordComponent
];

@NgModule({
    declarations: [components],
    exports: [components],
    imports: [
        CommonModule, 
        RouterModule,
        ReactiveFormsModule
    ]
})
export class UnusedModule { }