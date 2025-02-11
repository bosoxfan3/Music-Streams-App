import { useState, useEffect } from 'react';

import ChartmetricApi from './api';

import View from './style';
import TrackSearch from './components/trackSearch';
import TrackCard from './components/trackCard';
import Chart from './components/chart';

import type { Track, ChartData } from '../api/types';

const CompareTracks = () => {
    const [allTracks, setAllTracks] = useState<Track[]>([]);
    const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
    const [allChartData, setAllChartData] = useState<ChartData>({});
    const [selectedChartData, setSelectedChartData] = useState<ChartData>({});

    useEffect(() => {
        async function fetchTracks() {
            const tracks = await ChartmetricApi.getTracks();
            const formattedTracks = tracks.map((song: Track) => {
                const release = song.album[0].release_date;
                const date = new Date(release);
                const formattedDate = date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                });
                song.album[0].release_date = formattedDate;
                return song;
            });
            setAllTracks(formattedTracks);
        }

        async function fetchCharts() {
            const charts = await ChartmetricApi.getCharts();
            setAllChartData(charts);
        }

        fetchTracks();
        fetchCharts();
    }, []);

    const addTrack = (track: Track) => {
        const newTracks: Track[] = [...selectedTracks];
        if (!newTracks.includes(track) && newTracks.length < 5) {
            newTracks.push(track);
        }

        const newChartData = { ...selectedChartData };
        newChartData[track.id] = allChartData[track.id];

        setSelectedTracks(newTracks);
        setSelectedChartData(newChartData);
    };

    const removeTrack = (track: Track) => {
        const newTracks: Track[] = [...selectedTracks];
        const filteredTracks = newTracks.filter(song => song.id !== track.id);

        const newChartData = { ...selectedChartData };
        if (newChartData[track.id]) {
            delete newChartData[track.id];
        }

        setSelectedTracks(filteredTracks);
        setSelectedChartData(newChartData);
    };

    return (
        <View>
            <div className="flex space-between">
                <div className="w-[400px]">
                    <TrackSearch allTracks={allTracks} selectedTracks={selectedTracks} addTrack={addTrack} />
                    {selectedTracks.map(track => (
                        <TrackCard key={track.id} track={track} removeTrack={removeTrack} />
                    ))}
                </div>
                <Chart selectedChartData={selectedChartData} />
            </div>
        </View>
    );
};

export default CompareTracks;
