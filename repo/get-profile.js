var fs = require("fs")
var path = require("path")
var safeParse = require("safe-json-parse")
var chain = require("continuable/chain")

var ensureDirectory = require("./ensure-directory")

module.exports = getProfile

function getProfile(profileName) {
    var file = chain(ensureDirectory(), function (loc) {
        var fileUri = path.join(loc, profileName + ".json")
        return fs.readFile.bind(null, fileUri)
    })

    return chain(file, safeParse)
}
