var fs = require("fs")
var path = require("path")
var safeParse = require("safe-json-parse")
var async = require("gens")
var both = require("gens/both")

var ensureDirectory = require("./ensure-directory")

module.exports = async(getProfile)

function* getProfile(profileName) {
    var loc = yield ensureDirectory()
    var fileUri = path.join(loc, profileName + ".json")
    var data = yield both(fs.readFile.bind(null, fileUri))

    var err = data[0]
    if (err) {
        return err.code === "ENOENT" ? null : err
    }

    return yield safeParse(data[1])
}
