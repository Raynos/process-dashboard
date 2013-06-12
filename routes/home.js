var stringify = require("jsonml-stringify")
var WriteHtml = require("write-html")
var async = require("gens")

module.exports = function Home(repo, loadTemplate) {
    return {
        "GET": async(homePage),
        uri: "/"
    }

    function* homePage(req, res, opts) {
        var Mainpage = loadTemplate("main.js")
        var head = loadTemplate("head.js")

        var writer = WriteHtml(req, res)

        writer.writeHead(stringify(head("Process dashboard")))

        var profiles = yield repo.getProfiles()

        var page = Mainpage(viewModel(profiles))
        writer.writeBody(stringify(page))
    }
}

function viewModel(profiles) {
    return {
        profiles: profiles,
        mainProfile: profiles[0]
    }
}
