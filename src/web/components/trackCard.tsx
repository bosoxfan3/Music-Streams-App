import { Eye, X } from 'lucide-react';

import type { Track } from '../../api/types';

type Props = {
    track: Track;
    removeTrack: (track: Track) => void;
};

const TrackCard = ({ track, removeTrack }: Props) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 shadow-sm">
        <div className="flex items-center">
            <img src={track.image_url} alt={track.name} className="w-12 h-12 rounded-md mr-3" />
            <div>
                <p className="font-semibold">{track.name}</p>
                <p className="text-sm text-gray-500">Released {track.album[0].release_date}</p>
            </div>
        </div>
        <div className="flex gap-2">
            <button className="p-2 text-gray-400">
                <Eye size={24} />
            </button>
            <button className="p-2 text-stone-50" onClick={() => removeTrack(track)}>
                <X size={24} className="p-1 bg-gray-400 rounded-full" />
            </button>
        </div>
    </div>
);

export default TrackCard;
