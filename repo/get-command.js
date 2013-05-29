var map = require("continuable/map")
var getProfile = require("./get-profile")

module.exports = getCommand

//  getCommand := (profileName: String, commandName: String)
//      => Continuable<Command>
function getCommand(profileName, commandName) {
    return map(getProfile(profileName), function (profile) {
        return profile ?
            (profile.commands[commandName] || null) :
            null
    })
}
