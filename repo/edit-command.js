var extend = require("xtend")
var async = require("gens")

var getProfile = require("./get-profile")
var saveProfile = require("./save-profile")

module.exports = async(editCommand)

function* editCommand(profileName, command) {
    var commandName = command.name
    var profile = yield getProfile(profileName)
    var existing = profile.commands[commandName] || {}
    profile.commands[commandName] = extend(existing, command)
    return yield saveProfile(profile)
}
