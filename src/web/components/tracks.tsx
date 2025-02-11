import TrackSearch from './trackSearch';
import TrackCard from './trackCard';

import type { Track } from '../../api/types';

type Props = {
    allTracks: Track[];
    selectedTracks: Track[];
};

const Tracks = ({ allTracks, selectedTracks }: Props) => {
    return (
        <div>
            <TrackSearch allTracks={allTracks} selectedTracks={selectedTracks} />
            {selectedTracks.map(track => (
                <TrackCard key={track.image_url} track={track} />
            ))}
        </div>
    );
};

export default Tracks;
