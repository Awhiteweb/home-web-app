import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tides',
    loadChildren: () => import('./tides/tides.module').then(m => m.TidesModule)
  },
  {
    path: 'todos',
    loadChildren: () => import('./todos/todos.module').then(m => m.TodosModule)
  },
  {path: "", redirectTo: "/tides", pathMatch: "full"},
  {path: "**", redirectTo: "", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
