var document = require("global/document")
var unpack = require("unpack-element")
var console = require("console")

var ProfilesUI = require("./ui/profiles")
var client = require("./client")

var elems = unpack(document.body)

if (elems.profiles) {
    var profiles = ProfilesUI(elems.profiles)

    profiles.on("newProfile", function (profile) {
        client.addProfile(profile, function (err) {
            if (err) {
                return console.error("error adding profile", err)
            }

            profiles.addProfile(profile)
        })
    })
}


