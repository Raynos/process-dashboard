var sendHtml = require("send-data/html")
var JsonMLStringify = require("jsonml-stringify")

var loadTemplate = require("./load-template")

module.exports = homePage

function homePage(req, res) {
    var Mainpage = loadTemplate("main.js")

    sendHtml(req, res, JsonMLStringify(Mainpage()))
}
