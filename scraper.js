const request = require('request');
const cheerio = require('cheerio');

//Callback Example   cb=callback
exports.imgScrape = (url, cb) => {
    request(url, (error, resp, body) => {
     if(error) {
         cb({
             error: error
         });
     }
     let $ = cheerio.load(body);                   //passing cheerio in the HTML page's body
     let $url = url;                               //define url we passed into it
     let $img = $('.post-image img').attr('src')   //the image what we want to get from the body / to get the iage element, write img after post-image
                                                   //and to get the specific attribute within the element, specify it. In this case it is "source"
     let $title = $('.post-title').text();          //to get the title    
     let $desc = $('[itemprop=description]').text();

     let image = {      //create an object to send back
         url: $url,
         img: "http" + $img,
         title: $title,
         description: $desc
     }
    //respond with the final JSON
    console.log('scraped from scraper.js', image);
    cb(image);
 });
}
