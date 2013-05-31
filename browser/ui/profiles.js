var unpack = require("unpack-element")
var append = require("insert/append")
var remove = require("insert/remove")
var dom = require("jsonml-stringify/dom")
var EventEmitter = require("events").EventEmitter

var submit = require("../lib/submit")
var profileItem = require("../../templates/profile")

module.exports = ProfilesUI

function ProfilesUI(root) {
    var elems = unpack(root)
    var addProfileButton = elems.addProfile
    var profileNameInput = elems.profileName
    var profilesList = elems.profilesList
    var profiles = elems.profiles || {}

    var widget = new EventEmitter()

    submit({
        addProfileButton: addProfileButton,
        profileName: profileNameInput
    }, function () {
        var profileName = profileNameInput.value
        if (profileName === "") {
            return
        }

        profileNameInput.value = ""

        widget.emit("newProfile", { name: profileName })
    })

    widget.addProfile = function addProfile(profile) {
        var elem = profiles[profile.name] = dom(profileItem(profile))
        append(profilesList, elem)
    }

    widget.removeProfile = function removeProfile(profileName) {
        remove(profiles[profileName])
    }

    return widget
}
