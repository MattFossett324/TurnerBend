const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://turnerbend.com/WaterLevel.html';

axios.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
  }
}).then((response) => {
  const $ = cheerio.load(response.data);
  const text = $('body').text();

  // Match all dates and water levels for the year 2023
  const regex = /(\d{2}-\d{2}-2023)\s+(\d+\.\d+\')/g;

  let match;
  while ((match = regex.exec(text)) !== null) {
    console.log(`Water Level for ${match[1]} is: ${match[2]}`);
  }
}).catch((error) => {
  console.error(`Error: ${error}`);
});
