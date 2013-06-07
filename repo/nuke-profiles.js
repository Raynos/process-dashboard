var rimraf = require("rimraf")
var async = require("continuable-generators")

var ensureDirectory = require("./ensure-directory")

module.exports = async(nukeProfiles)

function* nukeProfiles() {
    var loc = yield ensureDirectory()
    return yield rimraf.bind(null, loc)
}
