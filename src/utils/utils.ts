export class Utils {
    /**
     * Get grouped bar chart config
     */
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

    /**
     * Get label for a specific sea surface variation
     * @param {string} type
     */
    static getLabel(type: string) {
        if (type === 'surface_sea_water_speed') {
            return 'Sea surface water speed';
        } else if (type === 'sea_surface_wave_maximum_height') {
            return 'Sea surface wave height(max)';
        } else {
            return 'Sea surface wave direction';
        }
    }

    /**
     * Get background colour for a type in grouped bar graph
     * @param {string} type
     */
    static getBackgroundColor(type: string) {
        if (type === 'surface_sea_water_speed') {
            return 'rgb(255, 99, 132)';
        } else if (type === 'sea_surface_wave_maximum_height') {
            return 'rgb(54, 162, 235)';
        } else {
            return 'rgb(75, 192, 192)';
        }
    }
}