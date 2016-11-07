function getBrokenLinks(scanData, path) {
    var linkScanner = require("./LinkCounter");
    var fs = require("fs");
    scanRecursive(path);
    setTimeout(function () {
        console.log(scanData);
        resultsToCSV(scanData);
    }, 2500);

    function scanRecursive(path) {
        var items = fs.readdirSync(path);
        for (var i in items) {
            var currentPath = path + "\\" + items[i];
            var type = fs.statSync(currentPath);
            if (type.isDirectory()) scanRecursive(currentPath);
            else readItem(currentPath, items[i]);
        }
    }

    function readItem(path, name) {
        var ext = name.split(".")[1];
        if (ext != "html" && ext != "xml") {
            //console.log(path);
            console.log(name, " is not a valid path ")
            return;
        }
        linkScanner(scanData, name, fs.readFileSync(path));
    }

    function resultsToCSV(data) {
        var header = "Name,Brainhoney,Box,Benjamin,Brainhoney Images, Empty, Static, Total Broken (404)\n";
        var csv = fs.writeFileSync("./csv_files/test.csv", header);
        for (var i in data) {
            // add document title
            var currentLine = i + ",";
            var relevantFound = false;
            for (var j in data[i]) {
                if (data[i][j] > 0) relevantFound = true;
                currentLine += data[i][j] + ",";
            }
            if (relevantFound) fs.appendFile("./csv_files/test.csv", currentLine + "\n", function (err) {
                console.log(err);
            });
        }
    }
}

module.exports = getBrokenLinks;
