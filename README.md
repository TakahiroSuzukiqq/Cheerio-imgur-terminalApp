1. Preparetaion & Installation  
````  
$ mkdir imgur  
$ touch app.js  
$ touch scraper.js  
$ npm init  
$ npm install --save request cheerio  
````  
  
2. Point
If you want to get the image from imgur, simply write below within the export method.  
````  
      scraper.js file    
const request = require('request');  
const cheerio = require('cheerio');  
  
exports.imgScrape = (url, cb) => {  
    request(url, (err, resp, body) => {  
     if(error) {  
         cb({  
             error: error  
         });  
     }  
    let $ = cheerio.load(body);    
    let $url = url;  
    let $img = $('.post-image img').attr('src')   *1  
  })  
}    
````  
You can specify the element with inspecting web site as following *1.
In this case,  I wanted to get the image from image class jp-post-image-thumb inside the div class post image.  
And to get the specific attribute within the element, specify it. In this case it is "source".  
*1 :  
<img src="https://image.ibb.co/dUSGXv/Screen_Shot_2017_07_02_at_23_48_50.png" alt="Screen_Shot_2017_07_02_at_23_48_50" border="0">    
    
<img src="https://image.ibb.co/mCZKkF/Screen_Shot_2017_07_02_at_23_49_04.png" alt="Screen_Shot_2017_07_02_at_23_49_04" border="0">  
 

Then create the object send back function, and use callback function inside the exports method.
````  
~~~~
 let image = {  
         url: $url,  
         img: "http" + $img,  
     }  
     cb.(image);  
 });  
}
````  
And then inside the app.js file, define scraper.js file and url which we get the image.  
As an callback example write following and check in the terminal with the command "node app.js"  

````  
     app.js  
const scraper = require('./scraper');  
const url = 'http://imgur.com/gallery/hj4NW';  
  
scraper.imgScrape(url, (data) => {   
 console.log('data from scraper received');  
 console.log(data);  
})  
````  
  
  

