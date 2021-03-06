import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';
import { IChartJsData, IJsonDataset } from '../types/types'
import jsonData from '../data/data.json';
import { Utils } from '../utils/utils';

const data: IChartJsData = {
    labels: [],
    datasets: [],
};

const GroupedBar = () => {
    useEffect(() => {
        // add labels and dataset from data file
        // @ts-ignore
        data.labels = Utils.getXAxisLabels(jsonData);

        addDataToGraph('surface_sea_water_speed');
        addDataToGraph('sea_surface_wave_maximum_height');
        addDataToGraph('sea_surface_wave_from_direction_at_variance_spectral_density_maximum');
    }, []);

    /**
     * Add different data to graph
     * @param {string} type
     */
    function addDataToGraph(type: string): void {
        const filteredDataForSeaSurfaceType = _.map(jsonData, (data: IJsonDataset): number => {
            // @ts-ignore
            return data[type] || 0;
        });
        const datasetForASpecificType = {
            label: Utils.getLabel(type),
            data: filteredDataForSeaSurfaceType,
            backgroundColor: Utils.getBackgroundColor(type),
            hidden: type !== 'surface_sea_water_speed'
        }
        // @ts-ignore
        data.datasets.push(datasetForASpecificType);
    }

    return (
        <Bar data={data} options={Utils.getBarChartConfigs()} type={data} />
    );
}

export default GroupedBar;