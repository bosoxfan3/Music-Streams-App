import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import type { Track, ChartData } from '../../api/types';

type Props = {
    selectedTracks: Track[];
    selectedChartData: ChartData;
    duration: number;
};

const songColors: { [id: Track['id']]: string } = {
    138071658: '#2CAFFE',
    134780977: '#544FC5',
    135543578: '#00E272',
    33210584: '#FE6A35',
    12492540: '#6B8ABC',
};

const Chart = ({ selectedTracks, selectedChartData, duration }: Props) => {
    // had to do this because I couldn't figure out how to stop it from changing colors when I hid a song
    // it was probably just basing it off index but just hardcoding this map solved the problem

    // Convert all datasets into Highcharts format
    const seriesData = Object.keys(selectedChartData).map(trackId => {
        const track = selectedTracks.find(song => song.id === parseFloat(trackId));
        return {
            name: track?.name, // Label for each dataset
            data: selectedChartData[trackId]
                .slice(0, duration !== Infinity ? duration - 1 : -1)
                .map((item, index) => [index + 1, item.value]), // Format: [day index, value]
            color: songColors[track?.id || 6] || undefined,
            marker: { enabled: false },
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
        credits: {
            enabled: false,
        },
        legend: { enabled: false },
        title: {
            // I'm hiding this by making it floating and white text
            text: 'Spotify Streams',
            floating: true,
            style: {
                color: '#ffffff',
            },
        },
        xAxis: {
            categories: xAxisCategories, // Labels: "Day 1", "Day 2", etc.
        },
        yAxis: {
            lineWidth: 1,
            title: { text: undefined },
        },
        tooltip: {
            shared: true,
            useHTML: true,
            headerFormat: '<b>Spotify Streams - {point.key}</b><br/>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
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
