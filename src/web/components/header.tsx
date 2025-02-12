type Props = {
    duration: number;
    changeDuration: (value: number) => void;
};

const Header = ({ duration, changeDuration }: Props) => {
    const tabs = [
        { id: '1M', label: '1M', value: 30 },
        { id: '3M', label: '3M', value: 90 },
        { id: '6M', label: '6M', value: 180 },
        { id: '1Y', label: '1Y', value: 365 },
        { id: 'All', label: 'All', value: Infinity },
    ];

    return (
        <div className="flex justify-between items-center p-4">
            <div>
                <h1 className="text-md font-semibold flex items-center">Compare Tracks: Spotify Streams</h1>
                <p className="text-zinc-500 text-sm">Compare performance of tracks from their release</p>
            </div>
            <div className="flex items-center bg-white border rounded-lg shadow-sm">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => changeDuration(tab.value)}
                        className={`px-4 py-2 text-xs font-medium rounded-md transition-all 
                        ${tab.value === duration ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Header;
