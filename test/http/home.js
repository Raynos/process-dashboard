var test = require("tape-continuable")
var uuid = require("uuid")
var async = require("gens")

var repo = require("../../repo")
var server = require("./_server.js")
var request = server.request

server.start()

test("request main site", async(function* (assert) {
    var res = yield request.bind(null, "/")

    assert.equal(res.statusCode, 200)
    assert.notEqual(res.body.indexOf("Process dashboard"), -1)
}))

test("insert profile & request", async(function* (assert) {
    var name = uuid()
    yield repo.saveProfile({ name: name })

    var res = yield request.bind(null, "/")

    assert.equal(res.statusCode, 200)
    assert.notEqual(res.body.indexOf(name), -1)
}))

test("cleanup profiles", async(function* (assert) {
    yield repo.nukeProfiles()
}))

test("close server", async(function* (assert) {
    yield server.close()
}))
