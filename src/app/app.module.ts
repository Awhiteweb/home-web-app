import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './common/components/navbar/navbar.component';
import {NavbarDropdownComponent} from './common/components/dropdowns/navbar-dropdown/navbar-dropdown.component';
// import {LayoutComponent} from './tides/layout/layout.component';
// import {ViewTidesComponent} from './tides/view-tides/view-tides.component';
// import {ViewLocationsComponent} from './tides/view-locations/view-locations.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarDropdownComponent,
    // LayoutComponent,
    // ViewTidesComponent,
    // ViewLocationsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
