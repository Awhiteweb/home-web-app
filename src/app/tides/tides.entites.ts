export type EventType = "HighWater" | "LowWater";

export interface ITide {
    eventType: EventType,
    dateTime: Date,
    height: number,
}

export type Tides = ITide[];

export interface IServerResponse {
    EventType: EventType,
    DateTime: Date,
    Height: number,
    IsApproximateTime: boolean,
    IsApproximateHeight: boolean,
    Filtered: boolean
}