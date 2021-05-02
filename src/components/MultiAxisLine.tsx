import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import _ from 'lodash';
import { IGroupedBarData, IJsonDataset } from  '../types/types'
import jsonData from '../data/data.json';
import { Utils } from '../utils/utils';

const data: IGroupedBarData = {
    labels: [],
    datasets: [],
};

const MultiAxisLine = () => {
    useEffect(() => {
        // add labels and dataset from data file
        data.labels = Utils.getDataLabels(jsonData);

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
            fill: false,
            backgroundColor: Utils.getBackgroundColor(type),
            borderColor: Utils.getBorderColor(type),
            yAxixID: type,
            hidden: type !== 'surface_sea_water_speed'
        }
        // @ts-ignore
        data.datasets.push(datasetForASpecificType);
    }

    return (
        <Line data={data} options={Utils.getBarChartConfigs()} type={data} />
    );
}

export default MultiAxisLine;