// setup to get the data from the database.txt file
import fs from 'fs';
import path from 'path';

function getFilePath(dbFile: string): string {
    return path.resolve(__dirname, dbFile);
}

export function getData(dbString: string, key: string) {
    const data = fs.readFileSync(getFilePath(dbString), 'utf8');
    const json = JSON.parse(data);
    return json[key];
}
