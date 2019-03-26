//Define the express framework
const express = require('express');
const axios = require('axios');
const app = express();

// define the body parser for post calls
const bodyparser = require('body-parser');
app.use(bodyparser.json());

// define your static route to serve the application
console.log(__dirname + '/gitscorev1/build/');
app.use(express.static(__dirname + '/gitscorev1/build/'));

// get call to fetch the username from UI and if successful - pass the call to git
app.get("/users/:userId", (req, res) => {
  console.log(req.params.userId);
  axios.get(`https://api.github.com/users/${req.params.userId}`)
    .then((response) => {
      var score = response.data.followers + response.data.public_repos;
      var name = response.data.login
      res.json(response.data);
      axios.post(`http://5c983a812e1ca60014d60d43.mockapi.io/sorescores`, {
        "name": name,
        "score": score,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
    })
    .catch((error) => {
      console.log(error);
    })

})

// get call to fetch data from mockAPI
app.get('/getusers', (req, res) => {
  axios.get('http://5c983a812e1ca60014d60d43.mockapi.io/sorescores')
    .then((response) => {
      //console.log(response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
})

//listen on a port- to serve the data
app.listen(1337);