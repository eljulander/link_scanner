module.exports = function (data, title, html) {
    console.log("Scanning... ", title);
    /*
     * Required Moduels
     */
    var fs = require("fs");
    var cheerio = require("cheerio");
    var https = require("https");

    // data storage variables
    var $ = cheerio.load(html);
    data[title] = {};
    var results = data[title];

    // gets broken link count
    results["brainhoney"] = $("a[href*='brainhoney.com']").length;
    results["box"] = $("a[href*='box.com']").length;
    results["benjamin"] = $("a[href*='courses.byui.edu']").length;
    results["brainhoney_images"] = $("img[src*='brainhoney.com']").length;
    results["empty"] = $("a[href*='./'], a[href=''], a[href='#']").length;
    results["static"] = $("a[href*='byui.brightspace.com/d2l/le/content'],a[href*='d2l/le/content']").length;

    // counts 404 links
    var broken = 0;
    for (var i = 0; i < $("a").length; i++) isBroken($($("a")[i]).attr("href"), function (working) {
        if (!working) {
            broken++;
        }
        results["broken"] = broken;
        console.log(results);
    });

    function isBroken(href, callback) {
        if (href.indexOf("/content/enforced/") >= 0) {
            href = "https://byui.brightspace.com" + href;
        }
        try {
            https.get(href, function (res) {
                console.log(res.statusCode);
                if (res.statusCode == "302") callback(true);
                else callback(false);
            }).on("error", function (e) {
               // console.log("There has been an error");
                callback(false);
            });
        }
        catch (e) {
           // console.log("wow..that is one bad link!", href);
            callback(false);
        }
    }
}
