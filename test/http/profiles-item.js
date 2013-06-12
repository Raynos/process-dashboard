var test = require("tape-continuable")
var uuid = require("uuid")
var async = require("gens")

var repo = require("../../repo")
var server = require("./_server.js")
var request = server.request

var profileName = uuid()

server.start()

test("can put profile", async(function* (assert) {
    var res = yield request.bind(null, {
        method: "PUT",
        uri: "/profiles/" + profileName,
        json: {
            name: profileName
        }
    })

    assert.equal(res.statusCode, 200)
    assert.equal(res.body.message, "ok")

    var profile = yield repo.getProfile(profileName)
    assert.equal(profile.name, profileName)
}))

test("can delete profile", async(function* (assert) {
    var res = yield request.bind(null, {
        method: "DELETE",
        uri: "/profiles/" + profileName,
        json: true
    })

    assert.equal(res.statusCode, 200)
    assert.equal(res.body.message, "ok")

    var profile = yield repo.getProfile(profileName)
    assert.equal(profile, null)
}))

test("cleanup profiles", async(function* () {
    yield repo.nukeProfiles()
}))

test("close server", async(function* () {
    yield server.close()
}))
