export type EventType = "HighWater" | "LowWater";

export interface ITide {
    eventType: EventType,
    dateTime: Date,
    height: number,
}

export type Tides = ITide[];

export interface ITideServerResponse {
    EventType: EventType,
    DateTime: string,
    Height: number,
    IsApproximateTime: boolean,
    IsApproximateHeight: boolean,
    Filtered: boolean
}

interface IGeometry {
    type: string,
    coordinates: number[]
}

interface IProperties {
    ContinuousHeightsAvailable: boolean,
    Country: string,
    Footnote: string,
    Id: string,
    Name: string
}

interface IFeature {
    type: string,
    geometry: IGeometry,
    properties: IProperties
}

export interface ITideLocationServerResponse {
    type: string,
    features: IFeature[]
}

export interface ITideLocation {
    name: string,
    id: string
}

export type TideLocations = ITideLocation[];