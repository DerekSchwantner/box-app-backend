const express = require("express");
const fs = require("fs");
const writeStream = fs.createWriteStream("post.csv");
const request = require("request");
const cheerio = require("cheerio");
const app = express();

app.get("/p4p", function(req, res) {
  url = "https://www.ringtv.com/ratings/?weightclass=251";
  let names = [];
  let fighters = [];
  // The structure of our request call
  // The first parameter is our URL
  // The callback function takes 3 parameters, an error, response status code and the html

  request(url, (error, response, html) => {
    // First we'll check to make sure no errors occurred when making the request

    if (!error) {
      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

      let $ = cheerio.load(html);

      // Finally, we'll define the variables we're going to capture
      //   let name, rank, record, nationality, titles;
      const rank = $(".number");
      let getName = $(".name").each((i, el) => {
        const name = $(el).text();
        //   .find(".name")
        //   .text();
        names.push(name);
        // console.log(names);
      });

      let getFighters = $(".fighter-link").each((i, el) => {
        fightersName = $(el)
          .find(".name")
          .text();
        fighterRank = $(el)
          .find(".number")
          .text();
        fighterTitles = $(el)
          .find(".wcat")
          .text();
        fighterRecord = $(el)
          .find(".fighter-link div:nth-child(5)")
          .text();

        fighters[i] = {
          fighterRank,
          fightersName,
          fighterTitles,
          fighterRecord
        };
      });
      console.log(fighters);
      //   console.log(getName.text());
      //   let json = { name: "", rank: "", record: "", nationality: "", titles: [] };
      //   console.log(rank.html());
    }
    // return names;
  });
});

exports = module.exports = app;
