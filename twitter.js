var Twitter = require('twitter');

var snowmed = require('./index')

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});


client.post('statuses/update.json', {
    status: snowmed(),
    possibly_sensitive: true
  },  function(error, tweet, response){
  if(error) {
    console.error(error)
    throw error;
  }
  console.log(tweet);  // Tweet body. 
  console.log(response);  // Raw response object. 
});