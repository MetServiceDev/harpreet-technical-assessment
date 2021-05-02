import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';
import moment from 'moment';
import { IGroupedBarData, IJsonDataset } from  '../types/types'
import jsonData from '../data/data.json';
import { Utils } from '../utils/utils';

const data: IGroupedBarData = {
    labels: [],
    datasets: [
        {
            label: '# of Red Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgb(255, 99, 132)',
        },
        {
            label: '# of Blue Votes',
            data: [2, 3, 20, 5, 1, 4],
            backgroundColor: 'rgb(54, 162, 235)',
        },
        {
            label: '# of Green Votes',
            data: [3, 10, 13, 15, 22, 30],
            backgroundColor: 'rgb(75, 192, 192)',
        },
    ],
};

const GroupedBar = () => {
    useEffect(() => {
        // add labels and dataset from data file
        data.labels = _.map(_.keys(jsonData), (label) => {
           return moment(label).format('YYYY-MM-DD');
        });

        addWaterSpeedDataset('surface_sea_water_speed');
        addWaterSpeedDataset('sea_surface_wave_maximum_height');
        addWaterSpeedDataset('sea_surface_wave_from_direction_at_variance_spectral_density_maximum');
    }, []);

    function addWaterSpeedDataset(type: string): void {
        const filteredData = _.map(jsonData, (data: IJsonDataset): number => {
            // @ts-ignore
            return data[type] || 0;
        });
        const ssWaterSpeedDataset = {
            label: Utils.getLabel(type),
            data: filteredData,
            backgroundColor: 'rgb(255, 92, 132)'
        }
        // @ts-ignore
        data.datasets.push(ssWaterSpeedDataset);
    }

    return (
        <Bar data={data} options={Utils.getBarChartConfigs()} type={data} />
    );
}

export default GroupedBar;