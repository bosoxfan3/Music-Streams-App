import fs from 'fs';
import path from 'path';

import type { Track } from './types';

function getFilePath(dbFile: string): string {
    return path.resolve(__dirname, dbFile);
}

export function getTracks(dbString: string): Track[] {
    const data = fs.readFileSync(getFilePath(dbString), 'utf8');
    const json = JSON.parse(data);
    return json['tracks'];
}
