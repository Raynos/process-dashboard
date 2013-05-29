var chain = require("continuable/chain")
var extend = require("xtend")

var getProfile = require("./get-profile")
var saveProfile = require("./save-profile")

module.exports = editCommand

function editCommand(profileName, command) {
    var commandName = command.name

    return chain(getProfile(profileName), function (profile) {
        var existing = profile.commands[commandName] || {}
        profile.commands[commandName] = extend(existing, command)
        return saveProfile(profile)
    })
}
