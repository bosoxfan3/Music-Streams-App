// @ts-nocheck
import { useState, useRef, useEffect } from 'react';

import { Search } from 'lucide-react';

import TrackCard from './trackCard';

import type { Track } from '../../api/types';

type Props = {
    allTracks: Track[];
    selectedTracks: Track[];
};

const TrackSearch = ({ allTracks, selectedTracks }: Props) => {
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

    const filteredTracks =
        query.length === 0
            ? allTracks
            : allTracks.filter(track => track.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <>
            {isOpen ? (
                <div className="relative w-80" ref={dropdownRef}>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search Tracks"
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onFocus={() => setIsOpen(true)} // Open on focus
                        />
                    </div>
                    {isOpen && (
                        <div className="absolute w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
                            {filteredTracks.length > 0 ? (
                                <>
                                    {query.length === 0 && (
                                        <p className="px-3 py-2 text-sm text-gray-500 font-semibold">
                                            Track Suggestions
                                        </p>
                                    )}
                                    {filteredTracks.map((track, index) => (
                                        <TrackCard key={track.image_url} track={track} />
                                    ))}
                                </>
                            ) : (
                                <p className="p-2 text-gray-500">No results found</p>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex justify-between items-center w-full px-4 py-2">
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
