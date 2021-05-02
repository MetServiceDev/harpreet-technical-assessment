import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';
import moment from 'moment';
import { IGroupedBarData, IJsonDataset } from  '../types/types'
import jsonData from '../data/data.json';
import { Utils } from '../utils/utils';

const data: IGroupedBarData = {
    labels: [],
    datasets: [],
};

const GroupedBar = () => {
    useEffect(() => {
        // add labels and dataset from data file
        data.labels = _.map(_.keys(jsonData), (label) => {
           return moment(label).format('YYYY-MM-DD');
        });

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
            backgroundColor: Utils.getBackgroundColor(type)
        }
        // @ts-ignore
        data.datasets.push(datasetForASpecificType);
    }

    return (
        <Bar data={data} options={Utils.getBarChartConfigs()} type={data} />
    );
}

export default GroupedBar;