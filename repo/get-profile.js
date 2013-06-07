var fs = require("fs")
var path = require("path")
var safeParse = require("safe-json-parse")
var async = require("continuable-generators")
var recover = require("continuable-generators/recover")

var ensureDirectory = require("./ensure-directory")

module.exports = async(getProfile)

function* getProfile(profileName) {
    return yield recover(function* () {
        var loc = yield ensureDirectory()
        var fileUri = path.join(loc, profileName + ".json")
        var file = yield fs.readFile.bind(null, fileUri)
        return yield safeParse(file)
    }, function* (err) {
        return err.code === "ENOENT" ? null : err
    })
}
