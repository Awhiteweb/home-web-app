import {AfterViewInit, Component, OnInit} from "@angular/core";
// import {Chart, ChartConfiguration, ScatterDataPoint} from "chart.js";
import {Observable} from "rxjs";
import {format, isBefore, addHours} from "date-fns";
import {Tides} from "../tides.entites";
import {Select, Store} from "@ngxs/store";
import {TidesState} from "../state/tides.state";
import {FetchTides} from "../state/tides.actions";

@Component({
    selector: 'app-tides-view',
    templateUrl: './view-tides.component.html'
})
export class ViewTidesComponent implements OnInit, AfterViewInit {

    @Select(TidesState.tides) tides$!: Observable<Tides>;
    @Select(TidesState.currentLocation) location$!: Observable<string>;
    isChartReady$!: Observable<boolean>;
    private xFormat = "dd/mm HH";

    constructor(private store: Store) {}

    ngOnInit() { 
        this.store.dispatch(new FetchTides());
    }

    ngAfterViewInit() { }

    private yAxisLabels(dataset: number[]): number[] {
        const axis = [];
        let start = Math.floor(dataset[0]);
        const end = Math.ceil(dataset[dataset.length - 1]);
        while(start <= end) {
            axis.push(start);
            start += 0.5;
        }
        return axis;
    }

    private xAxisLabels(dataset: Date[]): string[] {
        const axis = [];
        let current = dataset[0];
        do {
            axis.push(format(current, this.xFormat));
            current = addHours(current, 1);
        } while(isBefore(current, dataset[dataset.length - 1]));
        return axis;
    }

    // private buildChartConfig(value: DataBuilder): ILineChartConfig {
    //     const config: ILineChartConfig = {
    //         type: "line",
    //         data: {
    //             labels: value.xAxis,
    //             datasets: [
    //                 {
    //                     data: value.displayData,
    //                     label: "Tides",
    //                     tension: 0.9
    //                 }
    //             ],
    //         },
    //         options: {
    //             responsive: true,
    //             // title: {
    //             //     display: false,
    //             //     text: "Tide Chart",
    //             //     fontColor: "white",
    //             // },
    //             // tooltips: {
    //             //     mode: "index",
    //             //     intersect: false,
    //             // },
    //             hover: {
    //                 mode: "nearest",
    //                 intersect: true,
    //             },
    //             scales: {
    //                 xAxes: {
    //                     display: true,
    //                 },
    //                 yAxes:{
    //                     display: true
    //                 } 
    //             }
    //         }
    //     };
    //     return config;
    // }

    // setChartData(config: ILineChartConfig) {
    //     let ctx: any = document.getElementById("line-chart") as HTMLCanvasElement;
    //     ctx = ctx.getContext("2d");
    //     new Chart(ctx, config);
    // }

    private loadChart() {
        var config = {
            type: "line",
            data: {
                labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                ],
                datasets: [
                    {
                        label: new Date().getFullYear(),
                        backgroundColor: "#4c51bf",
                        borderColor: "#4c51bf",
                        data: [65, 78, 66, 44, 56, 67, 75],
                        fill: false,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: "Tide Chart",
                    fontColor: "white",
                },
                legend: {
                    labels: {
                        fontColor: "white",
                    },
                    align: "end",
                    position: "bottom",
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                hover: {
                    mode: "nearest",
                    intersect: true,
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontColor: "rgba(255,255,255,.7)",
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Day",
                                fontColor: "white",
                            },
                            gridLines: {
                                display: false,
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: "rgba(33, 37, 41, 0.3)",
                                zeroLineColor: "rgba(0, 0, 0, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontColor: "rgba(255,255,255,.7)",
                            },
                            display: false,
                            scaleLabel: {
                                display: false,
                                labelString: "Value",
                                fontColor: "white",
                            },
                            gridLines: {
                                borderDash: [3],
                                borderDashOffset: [3],
                                drawBorder: false,
                                color: "rgba(255, 255, 255, 0.15)",
                                zeroLineColor: "rgba(33, 37, 41, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                },
            },
        };
        // let ctx: any = document.getElementById("line-chart") as HTMLCanvasElement;
        // ctx = ctx.getContext("2d");
        // new Chart(ctx, config);
    }
}

interface DisplayData {
    x: number,
    y: number
}

interface DataBuilder {
    yAxis: number[];
    xAxis: string[];
    tides: Tides;
    displayData: DisplayData[];
}

/**
 * Will probably move to another class
 */

//  export interface ILineChartConfig extends ChartConfiguration {}

export interface IData {
    labels?: string[];
    datasets: IDataset[];
}

export interface IDataset {
    label: string;
    backgroundColor?: string;
    borderColor?: string;
    data: DatasetData;
    parsing?: IParsing;
    fill?: boolean;
    tension?: number
}

export interface IParsing {
    yAxisKey: string
}

/**
 * Dataset data can be either a number array
 * 
 * or 
 * 
 * Custom data object
 * 
 * The object can contain be a simple x,y object that doesn't need any parsing parameters
 * 
 * ```{x: string, y: number}```
 * 
 * or a more complex data object with an x property any other properties with number values. These objects need parsing parameters
 * 
 * ```{x: string, [key: string]: number}```
 */
export type DatasetData = number[] | any;

export interface IOptions {
    maintainAspectRatio?: boolean;
    responsive?: boolean;
    title?: ITile;
    legend?: ILegend;
    tooltips?: ITooltip;
    hover?: ITooltip;
    scales?: IScales;
}

export interface ITile {
    display?: boolean;
    text: string;
    fontColor?: string;
}

export interface ILegend {
    labels?: ITicks;
    align?: string;
    position?: string;
}

export interface ITooltip {
    mode: string;
    intersect: boolean;
}

export interface IScales {
    xAxes: IAxis[];
    yAxes: IAxis[];
}

export interface IAxis {
    ticks?: ITicks;
    display?: boolean;
    scaleLabel?: IScaleLabel;
    gridLines?: IGridLines;
}

export interface ITicks {
    fontColor?: string;
}

export interface IScaleLabel {
    display?: boolean;
    labelString?: string;
    fontColor?: string;
}

export interface IGridLines {
    display?: boolean;
    borderDash?: number[];
    borderDashOffset?: number[];
    color?: string;
    zeroLineColor?: string;
    zeroLineBorderDash?: number[];
    zeroLineBorderDashOffset?: number[];
}