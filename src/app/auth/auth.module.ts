import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

const routes: Routes = [
    { 
        path: "login", 
        component: LoginComponent 
    },
    { 
        path: "reset", 
        component: ResetPasswordComponent 
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
        LoginComponent,
        ResetPasswordComponent
    ]
})
export class AuthModule {}