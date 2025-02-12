// @ts-nocheck
// added ts-nocheck because I couldn't figure out how to type the current?.contains on the ref
import { useState, useRef, useEffect, useMemo } from 'react';

import { Search } from 'lucide-react';

import SuggestedTrackCard from './suggestedTrackCard';

import type { Track } from '../../types';

type Props = {
    allTracks: Track[];
    selectedTracks: Track[];
    addTrack: (track: Track) => void;
};

const TrackSearch = ({ allTracks, selectedTracks, addTrack }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // we want to hide any tracks that are already selected from being included in the suggestions
    const suggestedTracks = useMemo(
        () => allTracks.filter(track => !selectedTracks.includes(track)),
        [allTracks, selectedTracks]
    );

    const filteredTracks =
        !query.length
            ? suggestedTracks
            : suggestedTracks.filter(track => track.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <>
            {isOpen ? (
                <div className="relative w-100" ref={dropdownRef}>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search Tracks"
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none text-sm"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                    </div>
                    {isOpen && (
                        <div className="absolute w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
                            {!!filteredTracks.length ? (
                                <>
                                    <p className="px-3 py-1 text-sm text-gray-500 font-semibold">Track Suggestions</p>
                                    {filteredTracks.map((track, index) => (
                                        <button
                                            onClick={() => {
                                                addTrack(track);
                                                setIsOpen(false);
                                            }}
                                            className="w-full text-left"
                                            key={track.id}
                                        >
                                            <SuggestedTrackCard track={track} />
                                        </button>
                                    ))}
                                </>
                            ) : (
                                <p className="p-2 text-gray-500 text-sm">No results found</p>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex justify-between items-center w-full px-4 py-2 text-sm">
                    <div className="text-gray-600 font-medium">
                        {selectedTracks.length} {selectedTracks.length === 1 ? 'Track' : 'Tracks'}
                    </div>
                    <button
                        type="button"
                        className="flex items-center text-gray-600 font-bold hover:text-black transition"
                        onClick={() => setIsOpen(true)}
                    >
                        <Search size={16} className="mr-1" /> Add Tracks
                    </button>
                </div>
            )}
        </>
    );
};

export default TrackSearch;
