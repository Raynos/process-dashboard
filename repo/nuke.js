var rimraf = require("rimraf")
var chain = require("continuable/chain")

var ensureDirectory = require("./ensure-directory")

module.exports = nukeProfiles

function nukeProfiles() {
    return chain(ensureDirectory(), function (loc) {
        return rimraf.bind(null, loc)
    })
}
