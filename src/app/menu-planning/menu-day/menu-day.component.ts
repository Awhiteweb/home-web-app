import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { DayNotFoundError, IMenuDay } from "../entities/menu-day";
import { WeekNotFoundError } from "../entities/menu-week";
import { MenuState } from "../state/menu.state";

@Component({
    selector: "menu-day",
    templateUrl: "./menu-day.component.html"
})
export class MenuDayComponent implements OnInit {

    @Input() 
    menuDay!: string;
    
    menu$!: Observable<IMenuDay>;

    constructor(private menuState: MenuState, private store: Store) {}

    ngOnInit() {
        this.menu$ = this.store.select(MenuState.menuDay(this.menuDay!)).pipe(
            catchError( (err, caught) => {
                if(err instanceof WeekNotFoundError) {
                    console.log(err.message);
                    // trigger get week action
                }
                else if( err instanceof DayNotFoundError) {
                    console.log(err.message);
                    // notify that day needs adding or redirect to edit page
                }
                return caught;
            })
        )
    }
}