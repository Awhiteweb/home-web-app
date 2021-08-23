import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxsModule} from "@ngxs/store";
import {YesNoPipe} from "../yes-no.pipe";
import {CreateTodoComponent} from "./create-todo/create-todo.component";
import {LayoutComponent} from "./layout/layout.component";
import {TodosState} from "./state/todos.state";
import {TodosRoutingModule} from "./todos.routing.module";
import {ViewTodosComponent} from "./view-todos/view-todos.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TodosRoutingModule,
        NgxsModule.forFeature([TodosState])
    ],
    declarations: [
        LayoutComponent,
        CreateTodoComponent,
        ViewTodosComponent,
        YesNoPipe
    ],
    providers: [
        TodosState
    ]
})
export class TodosModule {

}