import { Eye, X } from 'lucide-react';

import type { Track } from '../../types';

type Props = {
    track: Track;
    removeTrack: (track: Track) => void;
    hideUnhideTrack: (track: Track) => void;
    hiddenTrackIds: number[];
};

// while I would've made this card and suggestedTrackCard a shared component in a real project, it was simplest for me to just separate them for now
// based on the small differences like the styling, text formatting, and icons/functionality
const TrackCard = ({ track, removeTrack, hideUnhideTrack, hiddenTrackIds }: Props) => (
    <div className="flex items-center justify-between p-2 rounded-lg bg-gray-100 mb-1">
        <div className="flex items-center">
            <img src={track.image_url} alt={track.name} className="w-10 h-10 rounded-md mr-3" />
            <div>
                <p className="font-semibold text-sm">{track.name}</p>
                <p className="text-xs text-gray-500">Released {track.album[0].release_date}</p>
            </div>
        </div>
        <div className="flex">
            <button className="p-1 text-gray-400" onClick={() => hideUnhideTrack(track)}>
                {hiddenTrackIds.includes(track.id) ? <Eye size={20} className="text-red-400" /> : <Eye size={20} />} {/* make the eye red if the song is hidden */}
            </button>
            <button className="p-1 text-stone-50" onClick={() => removeTrack(track)}>
                <X size={18} className="p-1 bg-gray-400 rounded-full" />
            </button>
        </div>
    </div>
);

export default TrackCard;
