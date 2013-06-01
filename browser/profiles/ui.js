var unpack = require("unpack-element")
var append = require("insert/append")
var remove = require("insert/remove")
var dom = require("jsonml-stringify/dom")
var extend = require("xtend/mutable")
var EventEmitter = require("events").EventEmitter

var submit = require("../lib/submit")
var profileItem = require("../../templates/profileItem")

module.exports = ProfilesUI

function ProfilesUI(root) {
    var elems = unpack(root)
    var widget = new EventEmitter()

    submit({
        addProfileButton: elems.addProfile,
        profileName: elems.profileName
    }, function () {
        var profileName = elems.profileName.value
        if (profileName === "") {
            return
        }

        elems.profileName.value = ""

        widget.emit("newProfile", { name: profileName })
    })

    extend(widget, RenderProfiles(elems))

    return widget
}

function RenderProfiles(elems) {
    var profiles = elems.profiles || {}

    return {
        addProfile: addProfile,
        removeProfile: removeProfile
    }

    function addProfile(profile) {
        var elem = profiles[profile.name] = dom(profileItem(profile))
        append(elems.profilesList, elem)
    }

    function removeProfile(profileName) {
        remove(profiles[profileName])
    }
}
