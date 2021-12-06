import { Injectable } from "@angular/core";
import { Action, createSelector, Selector, State, StateContext } from "@ngxs/store";
import { addDays, format, isSameDay, isSameWeek, parse, startOfWeek } from "date-fns";
import { tap } from "rxjs/operators";
import { DayNotFoundError } from "../entities/menu-day";
import { IMenuWeek, WeekNotFoundError } from "../entities/menu-week";
import { MenuService } from "../services/menu.service";
import { GetMenuWeek } from "./menu.actions";

export interface IMenuStateModel {
    weeks: IMenuWeek[];
}

const weekOptions: {weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6} = {weekStartsOn: 1};

@State<IMenuStateModel>({
    name: 'menus',
    defaults: {
        weeks: [{
            menu: [
                {day: startOfWeek(new Date(), weekOptions), meals: ['pasta']},
                {day: addDays(startOfWeek(new Date(), weekOptions), 1), meals: ['pizza', 'soup']},
                {day: addDays(startOfWeek(new Date(), weekOptions), 2), meals: ['risotto']}
            ],
            week: startOfWeek(new Date(), weekOptions)
        }]
    }
})
@Injectable()
export class MenuState {
    constructor(private menuService: MenuService) {}

    @Selector()
    static currentMenuWeek(state: IMenuStateModel) {
        return state.weeks.find(w => this.matchWeek(w.week));
    }

    static menuWeek(week: string) {
        return createSelector([MenuState], (state: IMenuStateModel) => {
            const weekDate = parse(week, MenuService.dateFormat, new Date());
            const weekIndex =  state.weeks.findIndex(w => this.matchWeek(w.week, week));
            if(weekIndex == -1) {
                throw new WeekNotFoundError(week);
            }
            return state.weeks[weekIndex];
        });
    }

    static menuDay(day: string) {
        return createSelector([MenuState], (state: IMenuStateModel) => {
            const dayDate = parse(day, MenuService.dateFormat, new Date());
            const weekIndex = state.weeks.findIndex(w => MenuState.matchWeek(w.week, day));
            if(weekIndex == -1) {
                throw new WeekNotFoundError(format(startOfWeek(dayDate, weekOptions), MenuService.dateFormat));
            }
            const dayIndex = state.weeks[weekIndex].menu.findIndex(d => isSameDay(d.day, dayDate));
            if(dayIndex == -1) {
                throw new DayNotFoundError(day);
            }
            return state.weeks[weekIndex].menu[dayIndex];
        });
    }

    @Action(GetMenuWeek)
    getMenuWeek(ctx: StateContext<IMenuStateModel>, {week}: GetMenuWeek) {
        const state = ctx.getState();
        return this.menuService.getMenuWeek(week).pipe(
            tap( w => {
                const currentIndex = state.weeks.findIndex(c => isSameWeek(c.week, w.week, weekOptions));
                if(currentIndex > -1) {
                    state.weeks.splice(currentIndex, 1);
                }
                state.weeks.push(w);
                ctx.setState(state);
            })
        );
    }

    private static matchWeek(week1: Date, week2?: string) {
        const test = !!week2 ? parse(week2, MenuService.dateFormat, new Date()) : startOfWeek(new Date(), weekOptions);
        return isSameWeek(week1, test, weekOptions);
    }
}