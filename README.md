1. Description  
This terminal app uses npm request & cheerio module to get image(+ etc).  
In this app, I scraped the data with using "Callback" and "Promise".  
2. Preparetaion & Installation  
````  
$ mkdir imgur  
$ touch app.js  
$ touch scraper.js  
$ npm init  
$ npm install --save request cheerio  
````  
  
3. Point  
If you want to get the image from imgur, simply write below within the export method.  
````  
【scraper.js : Callback】  
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
【scraper.js :Callback】  
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
【app.js】   
const scraper = require('./scraper');  
const url = 'http://imgur.com/gallery/hj4NW';  
  
scraper.imgScrape(url, (data) => {   
 console.log('data from scraper received');  
 console.log(data);  
})  
````  
  


When you want to use "Promise", insted of "Callback" jest setup as following.  
Inside the request function is almost the same, exepet for the error part.  
Also change "cb(image)" into "resolve(image)".  
````  
【scraper.js : Promise】  
exports.imgScrape2 = (url) => {  
    return new Promise((resolve, reject) => {  
      request(url, (error, resp, body) => {  
     if(error) {  
       reject(error);  
     }  
     let $ = cheerio.load(body);       
     let $url = url;                   
     let $img = $('.post-image img').attr('src')  
     let image = {  
         url: $url,  
         img: "http" + $img,  
     }  
    console.log('scraped from scraper.js', image);  
    resolve(image);  
 });   
    })  
}  
````
  
Within the app.js file, comment out callback method and add new module to get the scraped data to the project and store into text file as a JSON stringify version.  
````  
【app.js : Promise】  
const scraper = require('./scraper');  
const fs = require('fs');  
const url = 'http://imgur.com/gallery/hj4NW';  
const path = "text.txt"  
    
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
  ````  
    
Now when you do "node app.js" in the terminal, you can get the same data, and you also get the JSON stringify data iwith the text.txt file.  
  
    
