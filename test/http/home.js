var test = require("tape")
var uuid = require("uuid")

var nukeProfiles = require("../../repo/nuke-profiles")
var saveProfile = require("../../repo/save-profile")
var server = require("./_server")
var request = server.request

server.start()

test("request main site", function (assert) {
    request("/", function (err, res, body) {
        assert.ifError(err)
        assert.equal(res.statusCode, 200)
        assert.notEqual(body.indexOf("Process dashboard"), -1)

        assert.end()
    })
})

test("insert profile & request", function (assert) {
    var name = uuid()
    saveProfile({ name: name })(function (err) {
        assert.ifError(err)

        request("/", function (err, res, body) {
            assert.ifError(err)
            assert.equal(res.statusCode, 200)
            assert.notEqual(body.indexOf(name), -1)

            assert.end()
        })
    })
})

test("cleanup profiles", function (assert) {
    nukeProfiles()(function (err) {
        assert.ifError(err)
        assert.end()
    })
})

test("close server", function (assert) {
    server.close(assert)
})
