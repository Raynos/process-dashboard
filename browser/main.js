var document = require("global/document")
var unpack = require("unpack-element")
var console = require("global/console")

var Router = require("./lib/hash-router")
var ProfilesUI = require("./ui/profiles")
var client = require("./client")
var router = Router()

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

    router.addRoute("/profiles/:id/delete", function (hash, opts) {
        var id = opts.params.id

        client.removeProfile(id, function (err) {
            if (err) {
                return console.error("error in removing profile", err)
            }

            profiles.removeProfile(id)
            router.go("/profiles")
        })
    })
}

router.applyChange()
