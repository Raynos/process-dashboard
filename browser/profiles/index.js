var console = require("global/console")

var ProfilesUI = require("./ui")

module.exports = Profiles

function Profiles(rootElem, opts) {
    var client = opts.client
    var router = opts.router
    var profiles = ProfilesUI(rootElem)

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
