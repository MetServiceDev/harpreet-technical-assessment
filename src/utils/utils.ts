import _ from 'lodash';
import moment from 'moment';
import { ICSVData, IMergedData, DatasetVariables } from '../types/types';


const assertNever = (value: never) => {
    throw new Error(`Value "${value}" should not be reachable`);
}
export class Utils {
    /**
     * Get grouped bar chart config
     */
    static getBarChartConfigs() {
        return {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
            tooltips: {
                enabled: false,
                mode: "x",
                intersect: false,
                // @ts-ignore
                custom: (tooltipModel) => {

                    // hide the tooltip
                    // if (tooltipModel.opacity === 0) {
                    //     // @ts-ignore
                    //     this.hide();
                    //     return;
                    // }
                    // // @ts-ignore
                    // const position = this.refs.chart.chart_instance.chart.canvas.getBoundingClientRect();
                    //
                    // // set position of tooltip
                    // const left = position.left + tooltipModel.caretX;
                    // const top = position.top + tooltipModel.caretY;
                    //
                    // // set values
                    // const date = Math.random(); // tooltipModel.dataPoints[0].xLabel;
                    // const valueNew = 2; // tooltipModel.dataPoints[0].yLabel;
                    // const valueOld = 3; // tooltipModel.dataPoints[1].yLabel;
                    //
                    // this.setPositionAndData({top, left, date, valueNew, valueOld});
                },
            }
        };
    }

    /**
     * Get multi axis chart config
     */
    static getMultiAxisConfigs() {
        return {
            scales: {
                yAxes: [
                    {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                    },
                    {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        id: 'y-axis-2',
                        gridLines: {
                            drawOnArea: false,
                        },
                    },
                ],
            },
        };
    }

    /**
     * Get label for a specific sea surface variation
     * @param {string} type
     */
    static getLabel(type: DatasetVariables): string {
        switch (type) {
            case DatasetVariables.surface_sea_water_speed: {
                return 'Sea surface water speed';
            } case DatasetVariables.sea_surface_wave_maximum_height: {
                return 'Sea surface wave height(max)';
            } case DatasetVariables.sea_surface_wave_from_direction_at_variance_spectral_density_maximum: {
                return 'Sea surface wave direction';
            } case DatasetVariables.sea_surface_wave_significant_height: {
                return 'Sea surface wave significant height';
            } case DatasetVariables.air_temperature_at_2m_above_ground_level: {
                return 'Air temperature 2m above ground level';
            } case DatasetVariables.wind_from_direction_at_10m_above_ground_level: {
                return 'Wind direction 10m above ground level';
            } case DatasetVariables.wind_speed_at_10m_above_ground_level: {
                return 'Wind speed 10m above ground level';
            } default: {
                assertNever(type);
            }
        }
        return `${type} was not recognised`;
    }

    /**
     * Get background colour for a type in grouped bar graph
     * @param {string} type
     */
    static getBackgroundColor(type: DatasetVariables) {
        if (type === DatasetVariables.surface_sea_water_speed || type === DatasetVariables.sea_surface_wave_significant_height) {
            return 'rgb(255, 99, 132)';
        } else if (type === DatasetVariables.sea_surface_wave_maximum_height || type === DatasetVariables.air_temperature_at_2m_above_ground_level) {
            return 'rgb(54, 162, 235)';
        } else if (type === DatasetVariables.sea_surface_wave_from_direction_at_variance_spectral_density_maximum || type === DatasetVariables.wind_from_direction_at_10m_above_ground_level) {
            return 'rgb(75, 192, 192)';
        } else {
            return 'rgb(144, 62, 200)';
        }
    }

    static getBorderColor(type: DatasetVariables) {
        if (type === DatasetVariables.surface_sea_water_speed || type === DatasetVariables.sea_surface_wave_significant_height) {
            return 'rgb(255, 99, 132, .2)';
        } else if (type === DatasetVariables.sea_surface_wave_maximum_height || type === DatasetVariables.air_temperature_at_2m_above_ground_level) {
            return 'rgb(54, 162, 235, .2)';
        } else if (type === DatasetVariables.sea_surface_wave_from_direction_at_variance_spectral_density_maximum || type === DatasetVariables.wind_from_direction_at_10m_above_ground_level) {
            return 'rgb(75, 192, 192, .2)';
        } else {
            return 'rgb(144, 62, 200, .2)';
        }
    }

    static getXAxisLabels(data: IMergedData): string[] {
        return _.map(_.keys(data), (label) => {
            return moment(label).format('YYYY-MM-DD HH:MM');
        });
    }

    /**
     * Convert CSV data returned from papaparse to json data format of time as key and object contain different values
     * @param {string[]} data
     */
    static convertCSVToJSONFormat(data: string[]): ICSVData {
        let formattedCSVData: ICSVData = {};
        _.map(data, (datum) => {
            formattedCSVData[datum[0]] = {
                sea_surface_wave_significant_height: Number(datum[1]) || 0,
                air_temperature_at_2m_above_ground_level: Number(datum[2]) || 0,
                wind_from_direction_at_10m_above_ground_level: Number(datum[3]) || 0,
                wind_speed_at_10m_above_ground_level: Number(datum[4]) || 0,
            }
        });
        return formattedCSVData
    }

    /**
     * Get data for a specific field in an array for a specific type
     * @param {IMergedData} data
     * @param {string} type
     */
    static filterDataForAType(data: IMergedData, type: DatasetVariables): number[] {
        return _.map(data, (data) => {
            // @ts-ignore
            return data[type] || 0;
        })
    }

    /**
     * Convert a number to compass direction
     * @param {number} num
     */
    static degToCompass(num: number) {
        const val = Math.floor((num / 22.5) + 0.5);
        const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }
}