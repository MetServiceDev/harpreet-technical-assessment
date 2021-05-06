import React, { ChangeEventHandler } from 'react';
import Papa from 'papaparse';
import _ from 'lodash';
import { IChartJsDataset, IChartJsData, IMergedData } from '../types/types';
import { Utils } from '../utils/utils';
import { Line } from 'react-chartjs-2';
import jsonData from '../data/data.json';

const CSVMultiAxisLine: React.FC = () => {
    let file:any = null;
    let configs;

    const [waveHeightVsDirectionData, setWaveHeightVsDirectionData] = React.useState<IChartJsData>({labels: [], datasets: []})

    // @ts-ignore
    const handleChange = (event: ChangeEventHandler<HTMLInputElement>): void => {
        // @ts-ignore
        file = event.target.files[0];
    };

    function getFormattedDataset(datum: number[], type: string): IChartJsDataset {
        return {
            label: Utils.getLabel(type),
            data: datum,
            fill: false,
            backgroundColor: Utils.getBackgroundColor(type),
            borderColor: Utils.getBorderColor(type),
            yAxisId: type,
        }
    }

    const importCSV = () => {
        Papa.parse(file, {
            delimiter: "",
            chunkSize: 3,
            header: false,
            complete: function(responses: any) {
                // csv data
                const data: string[] = responses.data;
                data.shift();
                const formattedCSVData = Utils.convertCSVToJSONFormat(data);
                // merge with json data
                // @ts-ignore
                const mergedData: IMergedData = _.merge(formattedCSVData, jsonData);

                const waveHeightVsDirectionDataset: IChartJsDataset[] = [];
                // get labels
                const labels = Utils.getXAxisLabels(mergedData);

                // get wave height data formatted for chart
                const waveHeight = Utils.filterDataForAType(mergedData, 'sea_surface_wave_maximum_height')
                const waveHeightData = getFormattedDataset(waveHeight, 'sea_surface_wave_maximum_height');
                waveHeightVsDirectionDataset.push(waveHeightData);

                // get wave direction data formatted for chart
                const waveDirection = Utils.filterDataForAType(mergedData, 'sea_surface_wave_from_direction_at_variance_spectral_density_maximum');
                const waveDirectionData = getFormattedDataset(waveDirection, 'sea_surface_wave_from_direction_at_variance_spectral_density_maximum');
                waveHeightVsDirectionDataset.push(waveDirectionData);

                // get graph configs
                configs = Utils.getBarChartConfigs();
                setWaveHeightVsDirectionData({ labels, datasets: waveHeightVsDirectionDataset });
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
            <Line data={waveHeightVsDirectionData} options={configs} type={waveHeightVsDirectionData} />
        </div>
    )
}

export default CSVMultiAxisLine;