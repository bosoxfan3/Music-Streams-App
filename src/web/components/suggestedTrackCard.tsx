import type { Track } from '../../api/types';

type Props = {
    track: Track;
};

const SuggestedTrackCard = ({ track }: Props) => (
    <div className="flex items-center p-2 m-1 rounded-md bg-gray-100 cursor-pointer">
        <img src={track.image_url} alt={track.name} className="w-12 h-12 rounded-md mr-3" />
        <div>
            <p className="font-semibold">{track.name}</p>
            <p className="text-sm text-gray-500">{track.album[0].release_date}</p>
        </div>
    </div>
);

export default SuggestedTrackCard;
