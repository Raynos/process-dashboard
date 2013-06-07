var async = require("continuable-generators")
var parallel = require("continuable-para")
var fs = require("fs")

var getProfile = require("./get-profile")
var ensureDirectory = require("./ensure-directory")

var jsonFileType = /\.json$/

module.exports = async(getProfiles)

function* getProfiles() {
    var files = yield fs.readdir.bind(null, yield ensureDirectory())
    var profiles = yield parallel(files.map(function (file) {
        var profileName = file.replace(jsonFileType, "")
        return getProfile(profileName)
    }))

    return profiles.sort(byName)
}

function byName(left, right) {
    return left.name < right.name ? -1 : 1
}
