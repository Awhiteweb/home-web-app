import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MenuDayComponent } from "./menu-day/menu-day.component";
import { MenuService } from "./services/menu.service";
import { MenuState } from "./state/menu.state";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MenuDayComponent
    ],
    providers: [
        MenuState,
        MenuService
    ]
})
export class MenuPlanningModule {}