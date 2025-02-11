export interface Track {
    id: number;
    name: string;
    image_url: string;
    album: Array<{ release_date: string }>;
}

export interface Datapoint {
    timestp: Date;
    value: number;
    extrapolated: boolean;
    interpolated: boolean;
}

export interface ChartData {
    [songId: string]: Datapoint[];
}
