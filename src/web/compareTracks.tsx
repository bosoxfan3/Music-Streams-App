import { useState } from 'react';

import View from './style';
import Body from './components/body';
import Footer from './components/footer';

import type { Track } from '../types';

const CompareTracks = () => {
    const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);

    const onAdd = (track: Track) => {
        const newTracks: Track[] = [...selectedTracks];
        setSelectedTracks([...newTracks, track]);
    };

    return (
        <View>
            <Body selectedTracks={selectedTracks} />
            <Footer />
        </View>
    );
};

export default CompareTracks;
