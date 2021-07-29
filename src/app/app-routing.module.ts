import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {LayoutComponent} from './tides/layout/layout.component';

const routes: Routes = [
  {
    path: 'tides',
    // component: LayoutComponent
    loadChildren: () => import('./tides/tides.module').then(m => m.TidesModule)
  },
  {path: "", redirectTo: "/tides", pathMatch: "full"},
  {path: "**", redirectTo: "", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
