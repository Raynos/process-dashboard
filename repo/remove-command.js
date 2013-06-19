var async = require("gens")
var getProfile = require("./get-profile")
var saveProfile = require("./save-profile")

module.exports = async(removeCommand)

function* removeCommand(profileName, commandName) {
    var profile = yield getProfile(profileName)
    delete profile.commands[commandName]
    return yield saveProfile(profile)
}

