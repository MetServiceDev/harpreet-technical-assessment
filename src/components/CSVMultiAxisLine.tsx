import React, { ChangeEventHandler } from 'react';
import Papa from 'papaparse';
import _ from 'lodash';
import { IChartJsDataset, IChartJsData, IMergedDataset } from '../types/types';
import { Utils } from '../utils/utils';
import { Line, Bar } from 'react-chartjs-2';
import jsonData from '../data/data.json';

const CSVMultiAxisLine: React.FC = () => {
    let file:any = null;
    let configs;
    let labels: string[] = [];
    let mergedData: IMergedDataset;

    const [waveHeightVsDirectionData, setWaveHeightVsDirectionData] = React.useState<IChartJsData>({labels: [], datasets: []})
    const [windDirectionAt10mVsWindSpeedAt10mData, setWindDirectionAt10mVsWindSpeedAt10mData] = React.useState<IChartJsData>({labels: [], datasets: []})
    const [waveDirectionVsWaveHeightVsAirTempData, setWaveDirectionVsWaveHeightVsAirTempData] = React.useState<IChartJsData>({labels: [], datasets: []})

    // @ts-ignore
    const handleChange = (event: ChangeEventHandler<HTMLInputElement>): void => {
        // @ts-ignore
        file = event.target.files[0];
    };

    function getFormattedDataset(datum: number[], type: string, graphType: string = 'line'): IChartJsDataset {
        return {
            label: Utils.getLabel(type),
            data: datum,
            fill: false,
            backgroundColor: Utils.getBackgroundColor(type),
            borderColor: Utils.getBorderColor(type),
            yAxisId: type,
            type: graphType
        }
    }

    function setWaveHeightVsDirectionDataForGraph(): void {
        const waveHeightVsDirectionDataset: IChartJsDataset[] = [];
        // get wave height data formatted for chart
        const waveHeight = Utils.filterDataForAType(mergedData, 'sea_surface_wave_maximum_height')
        const waveHeightData = getFormattedDataset(waveHeight, 'sea_surface_wave_maximum_height');
        waveHeightVsDirectionDataset.push(waveHeightData);

        // get wave direction data formatted for chart
        const waveDirection = Utils.filterDataForAType(mergedData, 'sea_surface_wave_from_direction_at_variance_spectral_density_maximum');
        const waveDirectionData = getFormattedDataset(waveDirection, 'sea_surface_wave_from_direction_at_variance_spectral_density_maximum');
        waveHeightVsDirectionDataset.push(waveDirectionData);
        setWaveHeightVsDirectionData({ labels, datasets: waveHeightVsDirectionDataset });
    }

    function setWindDirectionAt10mVsWindSpeedAt10mDataForGraph() {
        const windDirectionAt10mVsWindSpeedAt10mData: IChartJsDataset[] = [];
        // get wind direction data formatted for chart
        const windDirection = Utils.filterDataForAType(mergedData, 'wind_from_direction_at_10m_above_ground_level')
        const windDirectionData = getFormattedDataset(windDirection, 'wind_from_direction_at_10m_above_ground_level');
        windDirectionAt10mVsWindSpeedAt10mData.push(windDirectionData);

        // get wind speed data formatted for chart
        const windSpeed = Utils.filterDataForAType(mergedData, 'wind_speed_at_10m_above_ground_level');
        const windSpeedData = getFormattedDataset(windSpeed, 'wind_speed_at_10m_above_ground_level');
        windDirectionAt10mVsWindSpeedAt10mData.push(windSpeedData);
        setWindDirectionAt10mVsWindSpeedAt10mData({ labels, datasets: windDirectionAt10mVsWindSpeedAt10mData });
    }

    function setWaveDirectionVsWaveHeightVsAirTempDataForGraph() {
        const waveDirectionVsWaveHeightVsAirTempData: IChartJsDataset[] = [];

        // get wave direction data formatted for chart
        const waveDirection = Utils.filterDataForAType(mergedData, 'sea_surface_wave_from_direction_at_variance_spectral_density_maximum');
        const waveDirectionData = getFormattedDataset(waveDirection, 'sea_surface_wave_from_direction_at_variance_spectral_density_maximum', 'bar');
        waveDirectionVsWaveHeightVsAirTempData.push(waveDirectionData);

        // get wave height data formatted for chart
        const waveHeight = Utils.filterDataForAType(mergedData, 'sea_surface_wave_maximum_height')
        const waveHeightData = getFormattedDataset(waveHeight, 'sea_surface_wave_maximum_height', 'bar');
        waveDirectionVsWaveHeightVsAirTempData.push(waveHeightData);

        // get air temp
        const airTemp = Utils.filterDataForAType(mergedData, 'air_temperature_at_2m_above_ground_level');
        const airTempData = getFormattedDataset(airTemp, 'air_temprature_at_2m_above_ground_level');
        waveDirectionVsWaveHeightVsAirTempData.push(airTempData);

        setWaveDirectionVsWaveHeightVsAirTempData({ labels, datasets: waveDirectionVsWaveHeightVsAirTempData });
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
                mergedData = _.merge(formattedCSVData, jsonData);

                // get labels
                labels = Utils.getXAxisLabels(mergedData);
                setWaveHeightVsDirectionDataForGraph();
                setWindDirectionAt10mVsWindSpeedAt10mDataForGraph();
                setWaveDirectionVsWaveHeightVsAirTempDataForGraph();

                // get graph configs
                configs = Utils.getBarChartConfigs();
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
            <div className="height-vs-direction">
                <Line data={waveHeightVsDirectionData} options={configs} type={waveHeightVsDirectionData} />
            </div>
            <div className="direction-vs-speed">
                <Line data={windDirectionAt10mVsWindSpeedAt10mData} options={configs} type={windDirectionAt10mVsWindSpeedAt10mData} />
            </div>
            <div className="direction-vs-height-vs-temp">
                <Bar data={waveDirectionVsWaveHeightVsAirTempData} type={waveDirectionVsWaveHeightVsAirTempData} />
            </div>
        </div>
    )
}

export default CSVMultiAxisLine;