import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(cors());


app.get('/api/*', async (req, res) => {
    const apiUrl = req.url.replace('/api/', '');
    const riotApiUrl = `https://europe.api.riotgames.com/${apiUrl}`;

    try {
        const response = await axios.get(riotApiUrl, {
            headers: {
                'X-Riot-Token': 'RGAPI-95ba2435-af61-487b-8763-d59dcca9270a', 
            },
        });
        res.json(response.data); 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data from Riot API' });
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`CORS proxy server is running on http://localhost:${port}`);
});
