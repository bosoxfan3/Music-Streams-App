import express from 'express';
import cors from 'cors';
import { getData } from './util';

const app = express();
app.use(cors());
app.use(express.json());

const port = 8080;
const dbString = './database.txt';

/** Returns all tracks in the database */
app.get('/tracks', (req, res) => {
    const tracks = getData(dbString, 'tracks');
    res.json({ tracks });
});

/** Returns all chart data in the database */
app.get('/charts', (req, res) => {
    const charts = getData(dbString, 'charts');
    res.json({ charts });
});

module.exports = app;

app.listen(port, () => {
    console.log(`Chartmetric is running on port ${port}.`);
});
