// @ts-nocheck
// added ts-nocheck because I couldn't figure out how to type 'tooltip' in the tooltip formatter function
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import type { Track, ChartData } from '../../types';

type Props = {
    selectedTracks: Track[];
    selectedChartData: ChartData;
    duration: number;
};

// had to do this because I couldn't figure out how to stop it from changing colors when I hid a song
// it was probably just basing it off index, but just hardcoding this map to colors highcharts supported solved the problem
const songColors: { [id: Track['id']]: string } = {
    138071658: '#2CAFFE',
    134780977: '#544FC5',
    135543578: '#00E272',
    33210584: '#FE6A35',
    12492540: '#6B8ABC',
};

const Chart = ({ selectedTracks, selectedChartData, duration }: Props) => {
    // Convert all datasets into highcharts format
    const seriesData = Object.keys(selectedChartData).map(trackId => {
        const track = selectedTracks.find(song => song.id === parseFloat(trackId));

        return {
            name: track?.name,
            data: selectedChartData[trackId]
                .slice(0, duration !== Infinity ? duration - 1 : -1) // slice the data to match the chosen duration
                .map((item, index) => [index + 1, item.value]), // [day index, value]
            color: songColors[track?.id || 0] || undefined,
            marker: { enabled: false }, // hide the shapes on the line
        };
    });
    console.log(seriesData);

    // Get the maximum number of days that could be shown, based on duration
    const maxDays = duration !== Infinity ? duration : Math.max(...Object.values(selectedChartData).map(arr => arr.length));

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
            // text is required, but I'm hiding this by making it floating and white text
            text: 'Spotify Streams',
            floating: true,
            style: {
                color: '#ffffff',
            },
        },
        xAxis: {
            categories: xAxisCategories,
        },
        yAxis: {
            lineWidth: 1,
            title: { text: undefined }, // text is required so hiding by setting undefined
        },
        tooltip: {
            shared: true, // creates that tooltip that shows the data for all lines
            useHTML: true,
            headerFormat: '<b>Spotify Streams - {point.key}</b><br/>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
            formatter: function(tooltip) {
                // reverses the tooltip order. for some reason highcharts default is bottom up
                // it still isn't perfect because it bases the entire order off of the last data point
                // but I couldn't figure out a better way in the short term to sort by the y values based on the specific x
                const defaultRows = tooltip.defaultFormatter.call(this, tooltip);
                const rowsToReverse = defaultRows.slice(1, defaultRows.length - 1);
          
                return [defaultRows[0], ...rowsToReverse.reverse()];
            }
        },
        series: seriesData,
    };

    return (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    )
};

export default Chart;
