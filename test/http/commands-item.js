var test = require("tape-continuable")
var uuid = require("uuid")
var async = require("gens")

var repo = require("../../repo")
var server = require("./_server.js")
var request = server.request

var profileName = uuid()

server.start()

test("insert dummy profile", async(function* (assert) {
    var res = yield request.bind(null, {
        method: "PUT",
        uri: "/profiles/" + profileName,
        json: {
            name: profileName
        }
    })

    assert.equal(res.statusCode, 200)
}))

test("can add command", async(function* (assert) {
    var res = yield request.bind(null, {
        method: "PUT",
        uri: "/profiles/" + profileName + "/commands/one",
        json: {
            name: "one",
            args: ["server.js"]
        }
    })

    assert.equal(res.statusCode, 200)
    assert.equal(res.body.message, "ok")

    var profile = yield repo.getProfile(profileName)
    assert.deepEqual(profile.commands.one, {
        name: "one",
        args: ["server.js"]
    })
}))

test("can edit command", async(function* (assert) {
    var res = yield request.bind(null, {
        method: "PATCH",
        uri: "/profiles/" + profileName + "/commands/one",
        json: {
            name: "one",
            command: "node"
        }
    })

    assert.equal(res.statusCode, 200)
    assert.equal(res.body.message, "ok")

    var profile = yield repo.getProfile(profileName)
    assert.deepEqual(profile.commands.one, {
        name: "one",
        command: "node",
        args: ["server.js"]
    })
}))

test("can delete command", async(function* (assert) {
    var res = yield request.bind(null, {
        method: "DELETE",
        uri: "/profiles/" + profileName + "/commands/one",
        json: true
    })

    assert.equal(res.statusCode, 200)
    assert.equal(res.body.message, "ok")

    var profile = yield repo.getProfile(profileName)
    assert.equal(profile.commands.one, undefined)
    assert.equal(Object.keys(profile.commands).length, 0)
}))

test("cleanup profiles", async(function* () {
    yield repo.nukeProfiles()
}))

test("close server", async(function* () {
    yield server.close()
}))
