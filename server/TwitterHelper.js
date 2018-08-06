const rp = require('request-promise');
const Twitter = require('twitter');
const fs = require('fs');
const colors = require('colors');

var client = new Twitter({
  consumer_key: 'uMeZ109nbQjxz15ybwecaWIFX',
  consumer_secret: 'xbi44uWnicPAktkUa6v3J3cYN4s3eJQ2nmQZ0YATXUWjq0vNzR',
  access_token_key: '18616681-bUSABQTOGXK84nvllDbxadyAYQqUZm5FbtTE9ZZ2H',
  access_token_secret: 'CDcRkJCzDpEu1F2R0a37it3weIbuYHK38ZcmJLAruhZ0V' 
});

// function searchForVerifiedUser(name){
//   return new Promise((resolve, reject) => {
//     client.get('https://api.twitter.com/1.1/users/search.json', {q: `${name.name}`, page: 1, include_entities: false})
//     .then(function(results){
//       var user = getVerifiedUser(results);
//       if(user){
//         resolve(user);
//       }else{
//         reject('Could not find user');
//       }
//     }).catch((err) => {
//       return err;
//     })
//   });
// }

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
  searchForVerifiedUser: searchForVerifiedUser
};