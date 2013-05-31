var stringify = require("jsonml-stringify")
var WriteHtml = require("write-html")

module.exports = homePage

function homePage(req, res, opts) {
    var getProfiles = opts.load("../repo/get-profiles")
    var Mainpage = opts.loadTemplate("main.js")
    var head = opts.loadTemplate("head.js")

    var writer = WriteHtml(req, res)

    writer.writeHead(stringify(head("Process dashboard")))

    getProfiles()(function (err, profiles) {
        var page = Mainpage(profiles)

        writer.writeBody(stringify(page))
    })
}
