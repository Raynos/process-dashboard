var fs = require("fs")
var path = require("path")
var chain = require("continuable/chain")

var ensureDirectory = require("./ensure-directory")

module.exports = removeProfile

function removeProfile(profileName) {
    return chain(ensureDirectory(), function (loc) {
        var fileUri = path.join(loc, profileName + ".json")
        return fs.unlink.bind(null, fileUri)
    })
}
