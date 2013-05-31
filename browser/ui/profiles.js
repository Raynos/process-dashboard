var unpack = require("unpack-element")
var append = require("insert/append")
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

    var widget = new EventEmitter()

    submit({
        addProfileButton: addProfileButton,
        profileName: profileNameInput
    }, function () {
        var profileName = profileNameInput.value
        if (profileName === "") {
            return
        }

        profileName.value = ""

        widget.emit("newProfile", { name: profileName })
    })

    widget.addProfile = function addProfile(profile) {
        append(profilesList, dom(profileItem(profile)))
    }

    return widget
}
