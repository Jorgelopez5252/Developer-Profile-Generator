const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const axios = require("axios");
require("dotenv").config();
const open= require("open");
const convertFactory = require("electron-html-to");
const generateHTML = require("./generateHTML");


const questions = [
    {
        type: "input",
        name: "github",
        message: "What is your GitHUb UserName?"
    },
    {
        type: "list",
        name: "color",
        message: "What is your favorite color?",
        choices:["blue", "green", "pink", "red"]
    }
  
];

function init() {
    inquirer.prompt(questions)
    .then(function (response) {
        const {github, color} = response;
        //What is below is the same thing as whats on line 28 just a different way of doing
        // const github = response.github;
        // const color = response.color; 
        axios.get(
            `https://api.github.com/users/${github}?client_id=${
            process.env.CLIENT_ID
            }&client_secret=${process.env.CLIENT_SECRET}`
        ).then(function(response) {
            console.log(response.data);
          
           axios.get(`https://api.github.com/users/${github}/repos?client_id=${
            process.env.CLIENT_ID
            }&client_secret=${process.env.CLIENT_SECRET}&per_page=100`)
           .then(function(stars) {
           
            let starCount = 0
           
            for (let i = 0; i < stars.data.length; i++) {
              const stargazers = stars.data[i].stargazers_count;
              starCount += stargazers;
              
            };
            console.log(starCount)

            const userData = {
                image: response.data.avatar_url,
                name: response.data.name,
                location: response.data.location,
                githubURL: response.data.url,
                bio: response.data.bio,
                publicRepos: response.data.public_repos,
                followers: response.data.followers,
                following: response.data.following,
                stars: starCount,
                color: color
            }
            return generateHTML(userData);
           }).then(function (html) {
               console.log(html);
           })

        })

    })
}

init();
