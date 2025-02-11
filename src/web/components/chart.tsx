import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import type { ChartData } from '../../api/types';

type Props = {
    selectedChartData: ChartData;
};

const Chart = ({ selectedChartData }: Props) => {
    // Convert all datasets into Highcharts format
    const seriesData = Object.keys(selectedChartData).map(key => {
        return {
            name: `Dataset ${key}`, // Label for each dataset
            data: selectedChartData[key].map((item, index) => [index + 1, item.value]), // Format: [day index, value]
        };
    });

    // Get the maximum number of days for the x-axis labels
    const maxDays = Math.max(...Object.values(selectedChartData).map(arr => arr.length));

    // Create x-axis labels like "Day 1", "Day 2", etc.
    const xAxisCategories = Array.from({ length: maxDays }, (_, i) => `Day ${i + 1}`);

    const chartOptions = {
        chart: {
            type: 'line',
        },
        title: {
            text: 'Values Over Days (Multiple Datasets)',
        },
        xAxis: {
            title: { text: 'Days' },
            categories: xAxisCategories, // Labels: "Day 1", "Day 2", etc.
            labels: { rotation: -45 },
        },
        yAxis: {
            title: { text: 'Value' },
        },
        series: seriesData, // Add multiple datasets to the chart
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
};

export default Chart;
