var merge = require('merge');
var yelp = require('node-yelp-api');
var express = require('express');
var app = express();

app.get('/', function(req, res){ 

  var options ={ 
  consumer_key: '07BSeMz5vajMDoPc1i02ng',
  consumer_secret: '4rBHePhlcRH-SEkbmHRKLlLLbg0',
  token: '8i9BMfEh8XttSzoUw-fb8T4C_tk6BVWH',
  token_secret: 'DYEUv11n8qjEVy0hysCeyUCjq58',
};
 
var parameters = {
  term: 'food',
  location: 'Montreal',
  limit:"10"
};

yelp.search(merge(options, parameters), (err,data) => {
  res.json(data);
  
 });
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Listening on port ' + port + '...');
});
