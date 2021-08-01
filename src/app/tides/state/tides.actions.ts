import {Tides} from "../tides.entites";

export class FetchTides {
    static readonly type = '[Tides] Fetch Tides';
    constructor(public locationId: string) {}
}

export class SetTidesLocation {
    static readonly type = '[Tides] Set Tides Location';
    constructor(public locationId: string) {}
}

export class FetchTideLocations {
    static readonly type = '[Tides] Fetch Tide Locations';
}