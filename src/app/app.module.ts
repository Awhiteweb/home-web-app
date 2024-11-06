import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxsModule} from '@ngxs/store';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {UnusedModule} from './unused/unused.module';
import {SharedModule} from './shared/shared.module';
import {environment} from 'src/environments/environment';

@NgModule({ 
    declarations: [
        AppComponent,
    ],
    bootstrap: [
        AppComponent
    ], 
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        SharedModule,
        UnusedModule,
        NgxsModule.forRoot([], { developmentMode: !environment.production })
    ], 
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule {}
