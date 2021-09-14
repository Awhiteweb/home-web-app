export class FetchTides {
    static readonly type = '[Tides] Fetch Tides';
}

export class SetTidesLocation {
    static readonly type = '[Tides] Set Tides Location';
    constructor(public locationId: string) {}
}

export class FetchTideLocations {
    static readonly type = '[Tides] Fetch Tide Locations';
}