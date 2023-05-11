const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://turnerbend.com/WaterLevel.html';

const targetDate = '05-11-2023'; // Change this to the date you want to check.

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const textNodes = $('body').text(); // Get all the text from the body of the webpage

    const lines = textNodes.split('\n'); // Split the text into lines
    let waterLevel;

    // Go through each line
    for (let line of lines) {
      if (line.includes(targetDate)) { // If the line includes the target date
        const parts = line.split(targetDate); // Split the line by the target date
        waterLevel = parts[1].trim(); // The water level should be the second part, remove any extra whitespace
        break;
      }
    }

    if (waterLevel) {
      console.log(`Water Level for ${targetDate} is: ${waterLevel}`);
    } else {
      console.log(`Could not find water level for ${targetDate}`);
    }
  })
  .catch(console.error);
