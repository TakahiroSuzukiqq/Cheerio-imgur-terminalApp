const scraper = require('./scraper');
const url = 'http://imgur.com/gallery/hj4NW';

//Callback Example
scraper.imgScrape(url, (data) => {  //passing the url wich is imgur location 
                                    //and when we do that we're going to get back the data of the scraped object / this parameter "data" can be called anything.
 console.log('data from scraper received');
 console.log(data);
})