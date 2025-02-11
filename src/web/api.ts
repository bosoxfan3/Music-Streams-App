import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

/** The API for the app **/
class ChartmetricApi {
    static async getTracks() {
        try {
            const req = await axios.get(`${BASE_URL}/tracks`);
            const { tracks } = req.data;
            return tracks;
        } catch (err) {
            throw new Error('Unable to fetch tracks');
        }
    }
}

export default ChartmetricApi;
