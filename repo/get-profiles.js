var chain = require("continuable/chain")
var map = require("continuable/map")
var list = require("continuable-list")
var fs = require("fs")

var getProfile = require("./get-profile")
var ensureDirectory = require("./ensure-directory")

var jsonFileType = /\.json$/

module.exports = getProfiles

function getProfiles() {
    var files = chain(ensureDirectory(), function (loc) {
        return fs.readdir.bind(null, loc)
    })

    var profiles = chain(files, function (files) {
        var profiles = files.map(function (file) {
            var profileName = file.replace(jsonFileType, "")
            return getProfile(profileName)
        })

        return list(profiles)
    })

    return map(profiles, function (profiles) {
        return profiles.sort(byName)
    })
}

function byName(left, right) {
    return left.name < right.name ? -1 : 1
}
