export interface IDataset {
    label: string;
    data: number[];
    backgroundColor: string;
}
export interface IJsonDataset {
    labels: string[];
    datasets: IDataset[];
}