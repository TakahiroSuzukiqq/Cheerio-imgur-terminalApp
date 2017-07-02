const scraper = require('./scraper');
const fs = require('fs');                       //to write out the contents of scraped object into a file use fs module
const url = 'http://imgur.com/gallery/hj4NW';
const path = "text.txt"                         //path of where a new file to be located that's going to contain the object

//Callback Example
// scraper.imgScrape(url, (data) => {  //passing the url wich is imgur location 
//                                     //and when we do that we're going to get back the data of the scraped object / this parameter "data" can be called anything.
//  console.log('data from scraper received');
//  console.log(data);
// })

//Promise Example
scraper.imgScrape2(url)
 .then((data) => {
     console.log('data from scraper received');
     fs.writeFile(path, JSON.stringify(data), (error) => {
         if (error) {
           console.log(error);
         }
       console.log('Successfully wrote to' + path);
     })
  })
  .catch((error) => {
      console.log('error scraping data');
  })