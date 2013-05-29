var chain = require("continuable/chain")

var getProfile = require("./get-profile")
var saveProfile = require("./save-profile")

module.exports = addCommand

function addCommand(profileName, command) {
    return chain(getProfile(profileName), function (profile) {
        profile.commands[command.name] = command

        return saveProfile(profile)
    })
}
