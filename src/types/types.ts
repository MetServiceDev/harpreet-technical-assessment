export enum DatasetVariables {
    sea_surface_wave_from_direction_at_variance_spectral_density_maximum = 'sea_surface_wave_from_direction_at_variance_spectral_density_maximum',
    surface_sea_water_speed = 'surface_sea_water_speed',
    sea_surface_wave_maximum_height = 'sea_surface_wave_maximum_height',
    sea_surface_wave_significant_height = 'sea_surface_wave_significant_height',
    air_temperature_at_2m_above_ground_level = 'air_temperature_at_2m_above_ground_level',
    wind_from_direction_at_10m_above_ground_level = 'wind_from_direction_at_10m_above_ground_level',
    wind_speed_at_10m_above_ground_level = 'wind_speed_at_10m_above_ground_level',
}

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
    [DatasetVariables.sea_surface_wave_from_direction_at_variance_spectral_density_maximum]?: number;
    [DatasetVariables.surface_sea_water_speed]?: number;
    [DatasetVariables.sea_surface_wave_maximum_height]?: number
}

export interface IJson {
    [key: string] : IJsonDataset
}

export interface ICSVDataset {
    [DatasetVariables.sea_surface_wave_significant_height]?: number;
    [DatasetVariables.air_temperature_at_2m_above_ground_level]?: number;
    [DatasetVariables.wind_from_direction_at_10m_above_ground_level]?: number;
    [DatasetVariables.wind_speed_at_10m_above_ground_level]?: number;
}

export interface ICSVData {
    [key: string]: ICSVDataset;
}

export interface IMergedData extends IJsonDataset, ICSVDataset { }

export interface IMergedDataset {
    [key: string]: IMergedData;
}