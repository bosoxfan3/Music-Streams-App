import express from 'express';
import cors from 'cors';
import { getTracks } from './util';

const app = express();
app.use(cors());
app.use(express.json());

const port = 8080;
const dbString = '../database.txt';

/** Returns all tracks in the database */
app.get('/tracks', (req, res) => {
    const tracks = getTracks(dbString);
    res.json({ tracks });
});

module.exports = app;

app.listen(port, () => {
    console.log(`Dosspace is running on port ${port}.`);
});
