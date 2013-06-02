var stringify = require("jsonml-stringify")
var WriteHtml = require("write-html")

module.exports = {
    "GET": homePage,
    uri: "/"
}

function homePage(req, res, opts) {
    var getProfiles = opts.load("../repo/get-profiles.js")
    var Mainpage = opts.loadTemplate("main.js")
    var head = opts.loadTemplate("head.js")

    var writer = WriteHtml(req, res)

    writer.writeHead(stringify(head("Process dashboard")))

    getProfiles()(function (err, profiles) {
        var page = Mainpage(viewModel(profiles))

        writer.writeBody(stringify(page))
    })
}

function viewModel(profiles) {
    return {
        profiles: profiles,
        mainProfile: profiles[0]
    }
}
