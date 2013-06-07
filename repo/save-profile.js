var fs = require("fs")
var path = require("path")
var async = require("continuable-generators")

var ensureDirectory = require("./ensure-directory")

// saveProfile := (Profile) => Continuable<void>
module.exports = async(saveProfile)

function* saveProfile(profile) {
    var loc = yield ensureDirectory()
    var payload = JSON.stringify(profile, null, "    ")
    var fileLoc = path.join(loc, profile.name + ".json")
    return yield fs.writeFile.bind(null, fileLoc, payload)
}
