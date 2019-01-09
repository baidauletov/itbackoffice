var bodyParser = require('body-parser');
var express    = require('express');
var fs 			   = require('fs');

var app =  express();
app.use(bodyParser.json());

const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page 		= await browser.newPage();

    searchLocation = "Almaty".split(' ').join('+'); 
    searchLocation = '%22' + searchLocation + '%22';
    searchLanguage = 'Ruby';

    // https://github.com/search?utf8=%E2%9C%93&q=location%3A%22New+York%22+language%3AJavaScript&type=Users
    // https://github.com/search?utf8=%E2%9C%93&q=developers+location%3A%22New+York%22+language%3AJavaScript&type=Users&ref=advsearch&l=&l=JavaScript
    // searchUrl = 'https://github.com/search?utf8=%E2%9C%93&q=developers+location%3A'+searchLocation+'+language%3AJavaScript&type=Users&ref=advsearch&l=&l=JavaScript'
    searchUrl = 'https://github.com/search?utf8=%E2%9C%93&q=location%3A'+searchLocation+'+language%3A'+searchLanguage+'&type=Users'

    await page.goto(searchUrl);
    await page.click('#user_search_results > div.user-list > div:nth-child(1) > div.d-flex.flex-auto > div > a');
    await page.waitFor(500);

    	const result = await page.evaluate(() => {
	        let name 		 = document.querySelector('#js-pjax-container > div > div.h-card.col-3.float-left.pr-3 > div.vcard-names-container.py-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-name.vcard-fullname.d-block.overflow-hidden');
	        let nickName = document.querySelector('#js-pjax-container > div > div.h-card.col-3.float-left.pr-3 > div.vcard-names-container.py-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-nickname.vcard-username.d-block').innerText;
	        let nickUrl  = "https://github.com/" + document.querySelector('#js-pjax-container > div > div.h-card.col-3.float-left.pr-3 > div.vcard-names-container.py-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-nickname.vcard-username.d-block').innerText;
	        
	        let company  = document.querySelector('#js-pjax-container > div > div.h-card.col-3.float-left.pr-3 > div.js-profile-editable-area > ul > li[itemprop="worksFor"] > span');
	        let location = document.querySelector('#js-pjax-container > div > div.h-card.col-3.float-left.pr-3 > div.js-profile-editable-area > ul > li[itemprop="homeLocation"] > span');
	        var photo    = document.querySelector('#js-pjax-container > div > div.h-card.col-3.float-left.pr-3 > a > img').src;
        
	        let data = {
	        		name,
	            company,
	            location
	        }

	        for(let key in data) {
	        	if(data[key] == null) {
	        		data[key] = 'not found'
	        	}
	        	else {
	        		data[key] = data[key].innerText;
	        	} 
	        }

	        data.nickName = nickName;
	        data.nickUrl  = nickUrl;
	        data.photo    = photo;

	      	console.log('company: ', company);
	      	console.log('location: ', location);
	        return data
	    });
    

    browser.close();
    return result;
};

scrape()
		.then((value) => {
			fs.writeFile("test.txt", JSON.stringify(value), function(err) {
		    if(err) {
		        return console.log(err);
		    }

	    	console.log("The file was saved!");
			});
	    console.log(value); // Получилось!
		})
		.catch(err=>{
			console.log('error scrape',err);
		});

var port = 3010;
app.listen(port, function() {
	console.log('server started on post: ', + port);
})