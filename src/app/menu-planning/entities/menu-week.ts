import { MenuDays } from "./menu-day";

export interface IMenuWeek {
    week: Date;
    menu: MenuDays;
}

export type MenuWeeks = IMenuWeek[];

export class WeekNotFoundError extends Error {
    constructor(week: string) {
        super(`Week ${week} not found`);
        Object.setPrototypeOf(this, WeekNotFoundError.prototype);
    }
}