import React, { ChangeEventHandler } from 'react';
import Papa from 'papaparse';
import _ from 'lodash';
import { IGroupedBarData } from '../types/types';
import { Utils } from '../utils/utils';
import { Line } from 'react-chartjs-2';

const CSVMultiAxisLine: React.FC = () => {
    let file:any = null;
    let labels: string[] = [];
    let waveSignificantHeight: string[] = [];
    let airTempratureAt2m: string[] = [];
    let windDirectionAt10m: string[] = [];
    let windSpeedat10m: string[] = [];
    let configs;

    const data: IGroupedBarData = {
        labels: [],
        datasets: [],
    };

    //use state to show/hide graph
    const [showgraph, setShowGraph] = React.useState<boolean>(false)
    const onClick = () => setShowGraph(true)

    // @ts-ignore
    const handleChange = (event: ChangeEventHandler<HTMLInputElement>): void => {
        // @ts-ignore
        file = event.target.files[0];
    };

    function addDataToGraph(type: string, datum: string[]) {
        const datasetForASpecificType = {
            label: Utils.getLabel(type),
            data: datum,
            fill: false,
            backgroundColor: Utils.getBackgroundColor(type),
            borderColor: Utils.getBorderColor(type),
            yAxixID: type,
            hidden: type !== 'surface_sea_water_speed'
        }
        // @ts-ignore
        data.datasets.push(datasetForASpecificType);
    }

    const importCSV = () => {
        Papa.parse(file, {
            delimiter: "",
            chunkSize: 3,
            header: false,
            complete: function(responses: any) {
                // display Graph
                const data = responses.data;
                data.shift();
                labels = _.map(data, (datum) => {
                    return datum[0];
                });
                waveSignificantHeight = _.map(data, (datum) => {
                    return datum[1] || 0;
                });
                airTempratureAt2m = _.map(data, (datum) => {
                    return datum[2] || 0;
                });
                windDirectionAt10m = _.map(data, (datum) => {
                    return datum[3] || 0;
                });
                windSpeedat10m = _.map(data, (datum) => {
                    return datum[4] || 0;
                });

                addDataToGraph('sea_surface_wave_significant_height', waveSignificantHeight);
                addDataToGraph('air_temprature_at_2m_above_ground_level', airTempratureAt2m);
                addDataToGraph('wind_from_direction_at_10m_above_ground_level', windDirectionAt10m);
                addDataToGraph('wind_speed_at_10m_above_ground_level', windSpeedat10m);
                configs = Utils.getBarChartConfigs();
                // show graph
                onClick();
                console.log(configs, 'configs');
            }
        });
    };

    return (
        <div>
            <div className="csv-reader">
                <h1>Upload CSV</h1>
                {/*@ts-ignore*/}
                <input type="file" onChange={handleChange} />
                <button className="btn btn-primary" onClick={importCSV}>Show Graph</button>
            </div>
            { showgraph ? <Line data={data} options={configs} type={data} /> : null }

        </div>
    )
}

export default CSVMultiAxisLine;