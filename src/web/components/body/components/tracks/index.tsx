import { useState } from 'react';

import View from './style';

import type { Track } from '../../../../../types';

type Props = {
    selectedTracks: Array<Track>;
};

const Tracks = ({ selectedTracks }: Props) => {
    const [isSearching, setIsSearching] = useState(false);
    return (
        <View>
            {isSearching ? (
                <div><input type="text" /></div>
            ) : (
                <div>
                    <div>
                        {selectedTracks.length} {selectedTracks.length === 1 ? 'Track' : 'Tracks'}
                    </div>
                    <button onClick={() => setIsSearching(true)}>Add Tracks</button>
                </div>
            )}
        </View>
    );
};

export default Tracks;
