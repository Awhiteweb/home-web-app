import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {NgxsModule} from "@ngxs/store";
import {TodosState} from "./state/todos.state";
import {TodosRoutingModule} from "./todos.routing.module";
import {ViewTodosComponent} from "./view-todos/view-todos.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TodosRoutingModule,
        NgxsModule.forFeature([TodosState])
    ],
    declarations: [
        ViewTodosComponent
    ]
})
export class TodosModule {

}