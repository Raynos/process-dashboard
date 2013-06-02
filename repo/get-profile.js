var fs = require("fs")
var path = require("path")
var safeParse = require("safe-json-parse")
var chain = require("continuable/chain")
var either = require("continuable/either")

var ensureDirectory = require("./ensure-directory")

module.exports = getProfile

function getProfile(profileName) {
    var file = chain(ensureDirectory(), function (loc) {
        var fileUri = path.join(loc, profileName + ".json")
        return fs.readFile.bind(null, fileUri)
    })

    var profile = chain(file, safeParse)

    return either(profile, function (err, callback) {
        if (err.code === "ENOENT") {
            return callback(null, null)
        }

        return callback(err)
    })
}
