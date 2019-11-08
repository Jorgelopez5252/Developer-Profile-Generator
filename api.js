const axios = require("axios");

var totalRepo = [];
var count;
function getUser(username){
        const queryUrl = `https://api.github.com/users/${username}/starred`;

        axios.get(queryUrl).then(function(result) {
       

          const repoNames = res.data
          let stars = 0
         
          for (let i = 0; i < repoNames.length; i++) {
            const stargazers = repoNames[i].stargazers_count;
            stars += stargazers;
            
          };
          console.log(stars);
        });
        //return res.data.length

}
module.exports = {
    getUser
}
