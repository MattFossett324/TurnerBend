const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://turnerbend.com/WaterLevel.html';

axios.get(url).then((response) => {
    const $ = cheerio.load(response.data);
    const text = $('body').text();
    const dateToFind = '05-11-2023';

    const regex = new RegExp(`${dateToFind}\\s+(\\d+\\.\\d+\\')`, 'g');
    const match = regex.exec(text);

    if (match) {
        console.log(`Water Level for ${dateToFind} is: ${match[1]}`);
    } else {
        console.log(`No water level data found for ${dateToFind}.`);
    }
}).catch((error) => {
    console.error(`Error: ${error}`);
});
