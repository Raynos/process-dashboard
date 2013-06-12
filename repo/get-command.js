var async = require("gens")
var getProfile = require("./get-profile")

module.exports = async(getCommand)

//  getCommand := (profileName: String, commandName: String)
//      => Continuable<Command>
function* getCommand(profileName, commandName) {
    var profile = yield getProfile(profileName)
    return !profile ? null : profile.commands[commandName] || null
}
