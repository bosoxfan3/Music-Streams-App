import View from './style';
import Tracks from './components/tracks';

import { Track } from '../../../types';

type Props = {
    selectedTracks: Track[];
};

const Body = ({ selectedTracks }: Props) => (
    <View>
        <Tracks selectedTracks={selectedTracks} />
    </View>
);

export default Body;
