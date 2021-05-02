import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';
import moment from 'moment';
import { IJsonDataset } from  '../types/types'
import jsonData from '../data/data.json';
import { Utils } from '../utils/utils';

const data: IJsonDataset = {
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
        return () => {
            // add labels and dataset from data file
            data.labels = _.map(_.keys(jsonData), (label) => {
               return moment(label).format('YYYY-MM-DD');
            });
        };
    }, []);

    return (
        <Bar data={data} options={Utils.getBarChartConfigs()} type={data} />
    );
}

export default GroupedBar;