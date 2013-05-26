var map = require("continuable/map")
var getProfile = require("./get-profile")

module.exports = getCommand

//  getCommand := (profileName: String, commandId: String)
//      => Continuable<Command>
function getCommand(profileName, commandId) {
    return map(getProfile(profileName), function (profile) {
        if (profile === null) {
            return null
        }

        return profile.commands.filter(function (command) {
            return command.id === commandId
        })[0] || null
    })
}
