import { Injectable } from "@angular/core";
import { parse } from "date-fns";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { IMenuWeek } from "../entities/menu-week";

@Injectable()
export class MenuService {
    static dateFormat = 'yyyy-MM-dd';

    getMenuWeek(dateString: string): Observable<IMenuWeek> {
        return of({ week: dateString, menu: [{ day: dateString, meals: ['curry'] }] }).pipe(
            map(value => ({
                week: parse(value.week, MenuService.dateFormat, new Date()),
                menu: value.menu.map(m => ({ day: parse(m.day, MenuService.dateFormat, new Date()), meals: m.meals }))
            }))
        );
    }
}