import TrackSearch from './trackSearch';

import type { Track } from '../../api/types';

type Props = {
    allTracks: Track[];
    selectedTracks: Track[]
    addTrack: (track: Track) => void;
    removeTrack: (track: Track) => void;
};

const Tracks = ({ allTracks, selectedTracks, addTrack, removeTrack }: Props) => {
    return (
        <div>
            <TrackSearch allTracks={allTracks} selectedTracks={selectedTracks} addTrack={addTrack} />
            
        </div>
    );
};

export default Tracks;
