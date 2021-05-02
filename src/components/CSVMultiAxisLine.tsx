import React, { ChangeEventHandler, useEffect } from 'react';
import Papa from 'papaparse';
import _ from 'lodash';

const CSVMultiAxisLine: React.FC = () => {
    let file:any = null;
    let labels: string[] = [];
    let waveSignificantHeight: string[] = [];
    let airTempratureAt2m: string[] = [];
    let windDirectionAt10m: string[] = [];
    let windSpeedat10m: string[] = [];
    // @ts-ignore
    const handleChange = (event: ChangeEventHandler<HTMLInputElement>): void => {
        // @ts-ignore
        file = event.target.files[0];
    };

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
            }
        });
    };

    return (
        <div className="csv-reader">
            <h1>Upload CSV</h1>
            {/*@ts-ignore*/}
            <input type="file" onChange={handleChange} />
            <button className="btn btn-primary" onClick={importCSV}>Show Graph</button>
        </div>
    )
}

export default CSVMultiAxisLine;