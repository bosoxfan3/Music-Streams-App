import { useState, useEffect } from 'react';

import ChartmetricApi from './api';

import View from './style';
import Tracks from './components/tracks';

import type { Track } from '../api/types';

const CompareTracks = () => {
    const [allTracks, setAllTracks] = useState<Track[]>([]);
    const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);

    useEffect(() => {
        async function fetchTracks() {
            const tracks = await ChartmetricApi.getTracks();
            setAllTracks(tracks);
        }

        fetchTracks();
    }, []);

    const onAdd = (track: Track) => {
        const newTracks: Track[] = [...selectedTracks];
        setSelectedTracks([...newTracks, track]);
    };

    return (
        <View>
            <Tracks allTracks={allTracks} selectedTracks={selectedTracks} />
        </View>
    );
};

export default CompareTracks;
