var chain = require("continuable/chain")
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

    return chain(files, function (files) {
        var profiles = files.map(function (file) {
            var profileName = file.replace(jsonFileType, "")
            return getProfile(profileName)
        })

        return list(profiles)
    })
}
