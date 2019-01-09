var bodyParser = require('body-parser');
var express    = require('express');
var fs 			   = require('fs');
// var path       = require('path');
// var session    = require('express-session');

// var mongooseConnection = require('./db/mongoose.connet').mongooseConnection;
//создаем каркас сервера и контроллеры
var app =  express();
// var searchRouter = require('./controller/searchController');
//путь к фронту
// var root = path.join(__dirname, "../client/public");
// app.use(express.static(path.join(__dirname, "./../client/public")));
// app.use(express.static(path.join(__dirname, "uploads")));

app.use(bodyParser.json());

// app.use('/', searchRouter);

const puppeteer = require('puppeteer');

// async function getPic() {
//   const browser = await puppeteer.launch({headless: false});
//   const page    = await browser.newPage();
//   await page.goto('https://google.com');
//   await page.setViewport({width: 1000, height: 500})
//   await page.screenshot({path: 'google.png'});

//   await browser.close();
// }

// getPic();

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    searchLocation = "Almaty".split(' ').join('+'); 
    searchLocation = '%22' + searchLocation + '%22';
    searchLanguage = 'JavaScript';

    // https://github.com/search?utf8=%E2%9C%93&q=location%3A%22New+York%22+language%3AJavaScript&type=Users
    // https://github.com/search?utf8=%E2%9C%93&q=developers+location%3A%22New+York%22+language%3AJavaScript&type=Users&ref=advsearch&l=&l=JavaScript
    // searchUrl = 'https://github.com/search?utf8=%E2%9C%93&q=developers+location%3A'+searchLocation+'+language%3AJavaScript&type=Users&ref=advsearch&l=&l=JavaScript'
    searchUrl = 'https://github.com/search?utf8=%E2%9C%93&q=location%3A'+searchLocation+'+language%3A'+searchLanguage+'&type=Users'

    await page.goto(searchUrl);
    await page.waitFor(50);
    var arr = document.querySelectorAll('#user_search_results > div.user-list');
    // await page.click('#user_search_results > div.user-list > div:nth-child(1) > div.d-flex.flex-auto > div > a');
    // await page.waitFor(50);
    await console.log(pages);

   //  const reserch = async () => {	
			// await page.click('#user_search_results > div.user-list > div:nth-child(1) > div.d-flex.flex-auto > div > a');
   //  	await page.waitFor(50);

   //  	const result = await page.evaluate(() => {
	  //       let name 		= document.querySelector('#js-pjax-container > div > div.h-card.col-3.float-left.pr-3 > div.vcard-names-container.py-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-name.vcard-fullname.d-block.overflow-hidden');
	  //       let nickName = document.querySelector('#js-pjax-container > div > div.h-card.col-3.float-left.pr-3 > div.vcard-names-container.py-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-nickname.vcard-username.d-block').innerText;
	  //       let nickUrl  = "https://github.com/" + document.querySelector('#js-pjax-container > div > div.h-card.col-3.float-left.pr-3 > div.vcard-names-container.py-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-nickname.vcard-username.d-block').innerText;
	        
	  //       let company  = document.querySelector('#js-pjax-container > div > div.h-card.col-3.float-left.pr-3 > div.js-profile-editable-area > ul > li[itemprop="worksFor"] > span');
	  //       let location = document.querySelector('#js-pjax-container > div > div.h-card.col-3.float-left.pr-3 > div.js-profile-editable-area > ul > li[itemprop="homeLocation"] > span');
	  //       var photo    = document.querySelector('#js-pjax-container > div > div.h-card.col-3.float-left.pr-3 > a > img').src;
	  //       console.log('src ', photo) 
	  //       // let price = document.querySelector('.price_color').innerText;
	  //       //#js-pjax-container > div > div.h-card.col-3.float-left.pr-3 > div.js-profile-editable-area > ul > li.homelocation > span
	  //       //#js-pjax-container > div > div.h-card.col-3.float-left.pr-3 > a > img


	  //       let data = {
	  //       		name,
	  //           company,
	  //           location
	  //       }

	  //       for(let key in data) {
	  //       	if(data[key] == null) {
	  //       		data[key] = 'not found'
	  //       	}
	  //       	else {
	  //       		data[key] = data[key].innerText;
	  //       	} 
	  //       }

	  //       data.nickName = nickName;
	  //       data.nickUrl  = nickUrl;
	  //       data.photo    = photo;

	  //     	console.log('company: ', company);
	  //     	console.log('location: ', location);
	  //       return data
	  //   });
   //  }

    browser.close();
    // return arrResult;
};

scrape()
		.then((value) => {
		// fs.writeFile("test.txt", JSON.stringify(value), function(err) {
	 //    if(err) {
	 //        return console.log(err);
	 //    }

  //   	console.log("The file was saved!");
		// });
    console.log(value); // Получилось!
		}).catch(err=>{
			console.log('errOr',err);
		});

 

// #user_search_results > div.user-list > div:nth-child(1) > div.d-flex.flex-auto > div > a

// app.get('*', function(req, res){
// 	var currentUrl = req.originalUrl;

// 	if(currentUrl.endsWith('/')) {
// 		currentUrl = currentUrl.substring(0, currentUrl.length-1);
// 	} 

// 	res.redirect('/#!' + currentUrl);
// });

var port = 3010;
app.listen(port, function() {
	console.log('server started on post: ', + port);
})