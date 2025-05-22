import { useState, useEffect } from 'react';

import Api from './api';

import TrackSearch from './components/trackSearch';
import TrackCard from './components/trackCard';
import Chart from './components/chart';
import Header from './components/header';
import Footer from './components/footer';

import type { Track, ChartData } from '../types';

const CompareTracks = () => {
    const [allTracks, setAllTracks] = useState<Track[]>([]);
    const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
    const [hiddenTrackIds, setHiddenTrackIds] = useState<number[]>([]); // used to track tracks that are selected but hidden from graph

    const [allChartData, setAllChartData] = useState<ChartData>({});
    const [selectedChartData, setSelectedChartData] = useState<ChartData>({});

    const [duration, setDuration] = useState<number>(180); // set default duration to 6 months

    useEffect(() => {
        async function fetchTracks() {
            const tracks = await Api.getTracks();
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
            const charts = await Api.getCharts();
            setAllChartData(charts);
        }

        fetchTracks();
        fetchCharts();
    }, []);

    const addTrack = (track: Track) => {
        const newTracks: Track[] = [...selectedTracks];
        // you shouldn't be able to select a song twice, but this adds another layer to prevent duplicates
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

        // reset the hidden status when removing a track
        const newHiddenTrackIds = [...hiddenTrackIds];
        const filteredHiddenTrackIds = newHiddenTrackIds.filter(id => id !== track.id);

        const newChartData = { ...selectedChartData };
        if (newChartData[track.id]) {
            delete newChartData[track.id];
        }

        setSelectedTracks(filteredTracks);
        setSelectedChartData(newChartData);
        setHiddenTrackIds(filteredHiddenTrackIds);
    };

    const hideUnhideTrack = (track: Track) => {
        const newChartData = { ...selectedChartData };
        let newHiddenTrackIds = [...hiddenTrackIds];
        if (newChartData[track.id]) {
            // hiding the only track breaks the graph so don't allow it
            if (selectedTracks.length === 1) {
                return;
            } else {
                delete newChartData[track.id];
                newHiddenTrackIds.push(track.id);
            }
        } else {
            newChartData[track.id] = allChartData[track.id];
            newHiddenTrackIds = newHiddenTrackIds.filter(id => id !== track.id);
        }
        setSelectedChartData(newChartData);
        setHiddenTrackIds(newHiddenTrackIds);
    };

    const changeDuration = (value: number) => setDuration(value);

    return (
        <div className="max-w-6xl m-4 px-4 bg-white rounded-lg shadow-md overflow-hidden">
            <Header changeDuration={changeDuration} duration={duration} />
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                    <TrackSearch allTracks={allTracks} selectedTracks={selectedTracks} addTrack={addTrack} />
                    {selectedTracks.map((track, index) => (
                        <TrackCard
                            key={track.id}
                            track={track}
                            removeTrack={removeTrack}
                            hideUnhideTrack={hideUnhideTrack}
                            hiddenTrackIds={hiddenTrackIds}
                        />
                    ))}
                </div>
                <div className="col-span-8">
                    <Chart selectedTracks={selectedTracks} selectedChartData={selectedChartData} duration={duration} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CompareTracks;
