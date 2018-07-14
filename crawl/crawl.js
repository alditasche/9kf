var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
const Country = require('../api/models/country');
const CCName = require('../api/models/CCName');


var url = 'https://www.cia.gov/library/publications/the-world-factbook/geos/print_';
var cc;

var test = CCName.find({}, function(err, docs) {
    if (!err){ 

    } else {throw err;}
}).then(docs =>{
	console.log(docs);
	for(var k in docs) {
		console.log(docs[k].cc);
		cc += docs[k].cc;

	}
		url = 'https://www.cia.gov/library/publications/the-world-factbook/geos/print_' + 'al' + '.html';
		request(url, function(error, response, body) {
			"use strict";
			if(error) {
				console.log('Error: ' + error);
			}
			//Check status code
			if(response.statusCode === 200) {
				//Parse document body
				body = cheerio.load(body);
				var area_total, area_land, area_water;
				area_total = body('#content > article > div > ul.expandcollapse > li:nth-child(4) > div:nth-child(8) > span.category_data').text();
				area_land = body('#content > article > div > ul.expandcollapse > li:nth-child(4) > div:nth-child(9) > span.category_data').text();
				area_water = body('#content > article > div > ul.expandcollapse > li:nth-child(4) > div:nth-child(10) > span.category_data').text();
		
				area_total = area_total.substring(0, area_total.indexOf(' ')).replace(/,/g, '');
				area_land = area_land.substring(0, area_land.indexOf(' ')).replace(/,/g, '');
				area_water = area_water.substring(0, area_water.indexOf(' ')).replace(/,/g, '');
		
				const country = new Country({
					cc: 'al',
					area_Total: parseInt(area_total),
					area_Land: parseInt(area_land),
					area_Water: parseInt(area_water)
				});
				country
						.save()
						.then(result => {
						console.log(result);
						})
						.catch(err => console.log(err));
			}
			
		});
	



});

