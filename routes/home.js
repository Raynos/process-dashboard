var stringify = require("jsonml-stringify")
var WriteHtml = require("write-html")

var loadTemplate = require("./load-template")

module.exports = homePage

function homePage(req, res, opts) {
    var getProfiles = opts.load("../repo/get-profiles")
    var Mainpage = loadTemplate("main.js")
    var head = loadTemplate("head.js")
    var writer = WriteHtml(req, res)

    writer.writeHead(stringify(head("Process dashboard")))

    getProfiles()(function (err, profiles) {
        var page = Mainpage(profiles)

        writer.writeBody(stringify(page))
    })
}
