var sendHtml = require("send-data/html")
var JsonMLStringify = require("jsonml-stringify")

var Mainpage = require("../templates/main")

module.exports = homePage

function homePage(req, res) {
    sendHtml(req, res, JsonMLStringify(Mainpage()))
}
