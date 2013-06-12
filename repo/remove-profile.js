var fs = require("fs")
var path = require("path")
var async = require("gens")

var ensureDirectory = require("./ensure-directory")

module.exports = async(removeProfile)

function* removeProfile(profileName) {
    var loc = yield ensureDirectory()
    var fileUri = path.join(loc, profileName + ".json")
    return yield fs.unlink.bind(null, fileUri)
}
