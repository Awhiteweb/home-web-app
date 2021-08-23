import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CreateTodoComponent} from "./create-todo/create-todo.component";
import {LayoutComponent} from "./layout/layout.component";
import {ViewTodosComponent} from "./view-todos/view-todos.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'create',
                component: CreateTodoComponent
            },
            {
                path: 'view',
                component: ViewTodosComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodosRoutingModule {}