var map = require("continuable/map")
var getProfile = require("./get-profile")

module.exports = getCommand

//  getCommand := (profileName: String, commandName: String)
//      => Continuable<Command>
function getCommand(profileName, commandName) {
    return map(getProfile(profileName), function (profile) {
        if (profile === null) {
            return null
        }

        return profile.commands.filter(function (command) {
            return command.name === commandName
        })[0] || null
    })
}
