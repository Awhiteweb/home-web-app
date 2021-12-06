import { IMenuDay } from "../entities/menu-day";

export class GetMenuWeek {
    static readonly type = '[Menu] Get Week';
    constructor(public week: string) {}
}

export class SetMenuWeek {
    static readonly type = '[Menu] Set Menu Week';
    constructor(public week: string, public menuWeek: IMenuDay[]) {}
}

export class EditMenuDay {
    static readonly type = '[Menu] Edit Menu Day';
    constructor(public menu: IMenuDay) {}
}

export class GetMenuDay {
    static readonly type = '[Menu] Get Menu Day';
    constructor(public day: string) {}
}