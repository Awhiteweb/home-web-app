export interface IMenuDay {
    day: Date;
    meals: string[];
}

export type MenuDays = IMenuDay[];

export class DayNotFoundError extends Error {
    constructor(day: string) {
        super(`Day ${day} not found`);
        Object.setPrototypeOf(this, DayNotFoundError.prototype);
    }
}