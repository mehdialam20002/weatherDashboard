const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const favoritesFile = path.join(__dirname, 'favorites.json');


const readFavoritesFile = () => {
    try {
        const data = fs.readFileSync(favoritesFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return [];
    }
};

const writeFavoritesFile = (data) => {
    try {
        fs.writeFileSync(favoritesFile, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing file:', error);
    }
};

// Get favorites
app.get('/favorites', (req, res) => {
    const data = readFavoritesFile();
    res.json(data);
});

// Add favorite
app.post('/favorites', (req, res) => {
    const { city } = req.body;
    const data = readFavoritesFile();

    if (!data.includes(city)) {
        data.push(city);
        writeFavoritesFile(data);
        res.send({ message: 'Favorite added!' });
    } else {
        res.status(400).send({ message: 'City already in favorites!' });
    }
});

// Delete favorite
app.delete('/favorites/:city', (req, res) => {
    const { city } = req.params;
    let data = readFavoritesFile();

    data = data.filter((fav) => fav !== city);
    writeFavoritesFile(data);

    res.send({ message: 'Favorite removed!' });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
