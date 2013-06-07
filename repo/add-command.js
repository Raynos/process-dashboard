var async = require("continuable-generators")
var getProfile = require("./get-profile")
var saveProfile = require("./save-profile")

module.exports = async(addCommand)

function* addCommand(profileName, command) {
    var profile = yield getProfile(profileName)
    profile.commands[command.name] = command
    return yield saveProfile(profile)
}
