import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {CardTableComponent} from './components/cards/table/card-table.component';
import {NavbarDropdownComponent} from './components/dropdowns/navbar-dropdown/navbar-dropdown.component';
import {NavbarComponent} from './components/navbar/navbar.component';

const components = [
    CardTableComponent,
    NavbarDropdownComponent,
    NavbarComponent
]
@NgModule({
    declarations: [components],
    exports: [components],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {}