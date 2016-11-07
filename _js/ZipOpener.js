let viewer;

function beginScanForPath(path, items) {
    var admZip = require("adm-zip");
    var fs = require("fs");
    fs.mkdirSync("./temp");
    var zip = new admZip(path);
    zip.extractAllTo("./temp");

    var folderScanner = require("./FolderScanner");
    var data = {};
    folderScanner(items, "./temp");

    setTimeout(function(){
        console.log(items);
        //viewer = createSubWindow("view.html", 800, 600);
        deleteFolder("./temp");
    },2000);
}

function deleteFolder(path) {
    var fs = require('fs');
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            }
            else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
module.exports = beginScanForPath;
