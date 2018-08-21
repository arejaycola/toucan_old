const Twitter = require('twitter');
const fs = require('fs');
const moment = require('moment');
const colors = require('colors');

/* Move this to environment variable. */
var client = new Twitter({
  consumer_key: 'uMeZ109nbQjxz15ybwecaWIFX',
  consumer_secret: 'xbi44uWnicPAktkUa6v3J3cYN4s3eJQ2nmQZ0YATXUWjq0vNzR',
  access_token_key: '18616681-bUSABQTOGXK84nvllDbxadyAYQqUZm5FbtTE9ZZ2H',
  access_token_secret: 'CDcRkJCzDpEu1F2R0a37it3weIbuYHK38ZcmJLAruhZ0V' 
});

async function getRetweets(user){
  try{
    const tweets = await client.get('https://api.twitter.com/1.1/search/tweets.json', {
      q: `${user.screen_name}`,
      result_type: 'recent'
    });

    // console.log(JSON.stringify(user, undefined, 2));
    // fs.writeFileSync('tweets.json', JSON.stringify(tweets, undefined, 2));

    let retweets = tweets.statuses.filter((status) => {
      return typeof status.retweeted_status != 'undefined';
    });

    let replies = tweets.statuses.filter((status) => {
      return status.in_reply_to_screen_name !== null;
    })

    const retweetDates = tweets.statuses.map((d) => {
      return moment(new Date(d.created_at));
    });

    minDate = moment.min(retweetDates);

    console.log('Min Date: ', minDate);
    console.log(replies.length);



    return tweets;

  }catch(e){
    throw new Error("Error fetching tweets. " + e.message);
  }
}

async function searchForVerifiedUser(name){
  try{
    const response = await client.get('https://api.twitter.com/1.1/users/search.json', {q: `${name.name}`, page: 1, include_entities: false})
    var user = getVerifiedUser(response);

    if(!user){
      throw new Error(`${name} is not a verified user.`);
    }

    return user;
  }catch(e){
    throw new Error("Error fetching user.");
  }
}

function getVerifiedUser(users) {
  for(var i = 0; i < users.length; i ++){
    if(users[i].verified){
      return users[i];
    }
  }
}


module.exports = {
  searchForVerifiedUser: searchForVerifiedUser,
  getRetweets
};