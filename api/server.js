const express = require("express");
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const app = express();

app.get("/scrape", function(req, res) {
  // The URL we will scrape from - in our example Anchorman 2.

  url = "https://www.ringtv.com/ratings/?weightclass=251";

  // The structure of our request call
  // The first parameter is our URL
  // The callback function takes 3 parameters, an error, response status code and the html

  request(url, (error, response, html) => {
    // First we'll check to make sure no errors occurred when making the request

    if (!error) {
      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

      let $ = cheerio.load(html);

      // Finally, we'll define the variables we're going to capture
      let names = [];
      //   let name, rank, record, nationality, titles;
      const rank = $(".number");
      let getName = $(".name").each((i, el) => {
        const name = $(el).text();
        //   .find(".name")
        //   .text();
        names.push(name);
        console.log(names);
      });

      //   console.log(getName.text());
      //   let json = { name: "", rank: "", record: "", nationality: "", titles: [] };
      //   console.log(rank.html());
    }
  });
});

// app.listen("8081");
// console.log("Magic happens on port 8081");
exports = module.exports = app;

{
  /* <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
<div class="white-box fighter-link" data-url="https://www.ringtv.com/fighters/canelo-alvarez/">
<div class="imagebox">
<div class="number"><span>1</span></div>
<img src="https://www.ringtv.com/wp-content/uploads/2016/07/canelo-e1473365393257-270x270.jpg" alt="Canelo Alvarez">
</div>
<div class="name">Canelo Alvarez</div>
<div class="wcat">RING, IBF, WBA middleweight</div> <div class="info">country: Mexico</div> <div class="info">53-1-2 (36 KOs)</div> <div class="info">WEEKS ON LIST: 78</div> </div>
</div> */
}
