var fs = require("fs")
var path = require("path")
var chain = require("continuable/chain")

var ensureDirectory = require("./ensure-directory")

// saveProfile := (Profile) => Continuable<void>
module.exports = saveProfile

function saveProfile(profile) {
    return chain(ensureDirectory(), function (loc) {
        var payload = JSON.stringify(profile, null, "    ")
        var fileLoc = path.join(loc, profile.name + ".json")

        return fs.writeFile.bind(null, fileLoc, payload)
    })
}
