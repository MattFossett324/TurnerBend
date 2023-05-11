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

  const regex = /(\d{2}[-~=\s]\d{2}[-~=\s]2023)\s+([\d.]+\'?)(?=\s)/g;

  let match;
  while ((match = regex.exec(text)) !== null) {
    // Replace non-standard date separators with a dash (-)
    const date = match[1].replace(/[-~=\s]/g, '-');
    console.log(`Water Level for ${date} is: ${match[2]}`);
  }
}).catch((error) => {
  console.error(`Error: ${error}`);
});
