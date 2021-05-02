export class Utils {
    static getBarChartConfigs() {
        return {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };
    }

    static getLabel(type: string) {
        if (type === 'surface_sea_water_speed') {
            return 'Sea surface water speed'
        } else if (type === 'sea_surface_wave_maximum_height') {
            return 'Sea surface wave height(max)'
        } else {
            return 'Sea surface wave direction';
        }
    }
}