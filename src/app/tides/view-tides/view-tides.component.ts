import {AfterViewInit, Component, OnDestroy, OnInit} from "@angular/core";
import Chart from "chart.js";
import {map} from "rxjs/operators";
import {format, isBefore, addHours} from "date-fns";

import {ILineChartConfig} from "../../shared/card-line-chart/line-chart.model";
import {Tides, ITide} from "../tides.model";
import {TidesService} from "../tides.services";
import {Subscription} from "rxjs";

interface DisplayData {
    x: string,
    y: number
}

interface DataBuilder {
    yAxis?: number[];
    xAxis?: string[];
    tides?: Tides;
    displayData?: DisplayData[];
}

@Component({
    selector: 'app-view-tides',
    templateUrl: './view-tides.component.html'
})
export class ViewTidesComponent implements OnInit, AfterViewInit, OnDestroy {

    private tideSubscription$: Subscription | null = null;
    private xFormat = "dd/mm HH";

    constructor(private tidesService: TidesService) { }

    ngOnDestroy(): void {
        this.tideSubscription$?.unsubscribe();
    }

    ngOnInit() {
        this.tideSubscription$ = this.tidesService.tides$.pipe(
            map((value: Tides) => value.sort((a: ITide, b: ITide) =>
                isBefore(a.dateTime, b.dateTime) ? -1 : 1)),
            map((value: Tides): DataBuilder => ({
                yAxis: this.yAxisLabels(value.map(x => x.height).sort((a,b) => a-b)),
                tides: value
            })),
            map((value: DataBuilder): DataBuilder => ({
                yAxis: value.yAxis,
                xAxis: this.xAxisLabels(value.tides.map(x => x.dateTime)),
                tides: value.tides
            })),
            map((value: DataBuilder): DataBuilder => ({
                yAxis: value.yAxis,
                xAxis: value.xAxis,
                displayData: value.tides.map((tide: ITide): DisplayData => ({
                    // test rounding to nearest hour
                    x: format(tide.dateTime, this.xFormat),
                    y: tide.height
                }))
            })),
        ).subscribe((data) => {
            //add data to default chart options
            //create function with dataset as input and add to defaults
            //function should create yaxis labels for the given height range
            //function should create xaxis labels for the given date range
        });
    }

    ngAfterViewInit() {
        this.loadChart();
    }

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
        } while(isBefore(current, dataset[dataset.length -1]));
        return axis;
    }

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
                        label: `${new Date().getFullYear()}`,
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
        this.setChartData(config);
    }

    setChartData(config: ILineChartConfig) {
        let ctx: any = document.getElementById("line-chart") as HTMLCanvasElement;
        ctx = ctx.getContext("2d");
        new Chart(ctx, config);
    }
}