export interface IChartJsDataset {
    label: string;
    data: number[];
    backgroundColor: string;
    fill?: boolean;
    borderColor?: string;
    yAxisId?: string;
    type?: string;
}
export interface IChartJsData {
    labels: string[];
    datasets: IChartJsDataset[];
}

export interface IJsonDataset {
    sea_surface_wave_from_direction_at_variance_spectral_density_maximum?: number;
    surface_sea_water_speed?: number;
    sea_surface_wave_maximum_height?: number
}

export interface IJson {
    [key: string] : IJsonDataset
}

export interface ICSVDataset {
    sea_surface_wave_significant_height?: number;
    air_temperature_at_2m_above_ground_level?: number;
    wind_from_direction_at_10m_above_ground_level?: number;
    wind_speed_at_10m_above_ground_level?: number;
}

export interface ICSVData {
    [key: string]: ICSVDataset;
}

export interface IMergedData extends IJsonDataset, ICSVDataset { }

export interface IMergedDataset {
    [key: string]: IMergedData;
}