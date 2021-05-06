export interface ILineChartConfig {
    type: string;
    data?: IData;
    options?: IOptions;
}

export interface IData {
    labels: string[];
    datasets: IDataset[];
}

export interface IDataset {
    label: string;
    backgroundColor?: string;
    borderColor?: string;
    data: DatasetData;
    parsing?: IParsing;
    fill?: boolean;
}

export interface IParsing {
    yAxisKey: string
}

export type DatasetData = number[] | IDatasetDataCustom;

/**
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
export interface IDatasetDataCustom {
    x: string;
}

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