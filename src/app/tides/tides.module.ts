import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: 'view',
        component: 
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild( routes )
    ],
    declarations: [
    ]
})
export class TidesModule {}