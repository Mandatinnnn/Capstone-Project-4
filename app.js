const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        let randomPage = Math.floor(Math.random() * 5);
        const response = await axios.get(`https://www.wikiart.org/en/popular-paintings?json=2&page=${randomPage}`);
        const data = response.data.Paintings;

        let portraits = [];
        let landscapes = [];

        data.forEach(image => {
            if (image.width >= image.height) {
                landscapes.push(image);
            } else {
                portraits.push(image);
            }
        });

        let images = [];
        let l = 0;
        let p = 0;

        for (let i = 0; i < 10; i++) {
            if (i % 2 === 0 && l < landscapes.length) {
                images.push(landscapes[l]);
                l++;
            } else if (p < portraits.length) {
                images.push(portraits[p]);
                p++;
            }
        }

        res.render('index', { images });
    } catch (error) {
        console.error(error);
        res.render('index', { images: [] });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
