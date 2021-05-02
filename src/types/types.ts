export interface IGroupedBarDataset {
    label: string;
    data: number[];
    backgroundColor: string;
}
export interface IGroupedBarData {
    labels: string[];
    datasets: IGroupedBarDataset[];
}

export interface IJsonDataset {
    sea_surface_wave_from_direction_at_variance_spectral_density_maximum?: number;
    surface_sea_water_speed?: number;
    sea_surface_wave_maximum_height?: number
}