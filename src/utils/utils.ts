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
        } else if ('sea_surface_wave_from_direction_at_variance_spectral_density_maximum') {
            return 'Sea surface wave direction';
        } else if (type === 'sea_surface_wave_significant_height') {
            return 'Sea surface wave significant height';
        } else if (type === 'air_temprature_at_2m_above_ground_level') {
            return 'Air temprature 2m above ground level';
        } else if (type === 'wind_from_direction_at_10m_above_ground_level') {
            return 'Wind direction 10m above ground level';
        } else {
            return 'Wind speed 10m above ground level';
        }
    }

    /**
     * Get background colour for a type in grouped bar graph
     * @param {string} type
     */
    static getBackgroundColor(type: string) {
        if (type === 'surface_sea_water_speed' || type === 'sea_surface_wave_significant_height') {
            return 'rgb(255, 99, 132)';
        } else if (type === 'sea_surface_wave_maximum_height' || type === 'air_temprature_at_2m_above_ground_level') {
            return 'rgb(54, 162, 235)';
        } else if(type === 'sea_surface_wave_from_direction_at_variance_spectral_density_maximum' || type === 'wind_from_direction_at_10m_above_ground_level') {
            return 'rgb(75, 192, 192)';
        } else {
            return 'rgb(144, 62, 200)';
        }
    }

    static getBorderColor(type: string) {
        if (type === 'surface_sea_water_speed' || type === 'sea_surface_wave_significant_height') {
            return 'rgb(255, 99, 132, .2)';
        } else if (type === 'sea_surface_wave_maximum_height' || type === 'air_temprature_at_2m_above_ground_level') {
            return 'rgb(54, 162, 235, .2)';
        } else if(type === 'sea_surface_wave_from_direction_at_variance_spectral_density_maximum' || type === 'wind_from_direction_at_10m_above_ground_level') {
            return 'rgb(75, 192, 192, .2)';
        } else {
            return 'rgb(144, 62, 200, .2)';
        }
    }

    static getDataLabels(jsonData: IJson) {
        return _.map(_.keys(jsonData), (label) => {
            return moment(label).format('YYYY-MM-DD');
        });
    }
}