import _ from 'lodash';
import moment from 'moment';
import { IJson } from '../types/types';

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
    static getLabel(type: string) {
        if (type === 'surface_sea_water_speed') {
            return 'Sea surface water speed';
        } else if (type === 'sea_surface_wave_maximum_height') {
            return 'Sea surface wave height(max)';
        } else {
            return 'Sea surface wave direction';
        }
    }

    /**
     * Get background colour for a type in grouped bar graph
     * @param {string} type
     */
    static getBackgroundColor(type: string) {
        if (type === 'surface_sea_water_speed') {
            return 'rgb(255, 99, 132)';
        } else if (type === 'sea_surface_wave_maximum_height') {
            return 'rgb(54, 162, 235)';
        } else {
            return 'rgb(75, 192, 192)';
        }
    }

    static getBorderColor(type: string) {
        if (type === 'surface_sea_water_speed') {
            return 'rgb(255, 99, 132, .2)';
        } else if (type === 'sea_surface_wave_maximum_height') {
            return 'rgb(54, 162, 235, .2)';
        } else {
            return 'rgb(75, 192, 192, .2)';
        }
    }

    static getDataLabels(jsonData: IJson) {
        return _.map(_.keys(jsonData), (label) => {
            return moment(label).format('YYYY-MM-DD');
        });
    }
}