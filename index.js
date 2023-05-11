const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const url = 'https://turnerbend.com/WaterLevels.html';

axios.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
  }
}).then((response) => {
  const $ = cheerio.load(response.data);
  const text = $('body').text();

  const regex = /(\d{2}[~=\/\s-]\d{2}[~=\/\s-]\d{4})\s*([\d.]+\'?)/g;

  let match;
  let data = [];
  while ((match = regex.exec(text)) !== null) {
    // Replace non-standard date separators with a dash (-)
    const date = match[1].replace(/[~=\/\s-]/g, '-').trim();
    data.push({date: date, level: match[2]});
  }

  const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: [
      {id: 'date', title: 'DATE'},
      {id: 'level', title: 'LEVEL'}
    ]
  });
  
  csvWriter.writeRecords(data)
    .then(() => {
      console.log('...Done');
    });
}).catch((error) => {
  console.error(`Error: ${error}`);
});
