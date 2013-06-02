var test = require("tape")
var uuid = require("uuid")

var nukeProfiles = require("../../repo/nuke-profiles")
var getProfile = require("../../repo/get-profile")
var server = require("./_server")
var request = server.request

var profileName = uuid()

server.start()

test("can put profile", function (assert) {
    request({
        method: "PUT",
        uri: "/profiles/" + profileName,
        json: {
            name: profileName
        }
    }, function (err, res, body) {
        assert.ifError(err)
        assert.equal(res.statusCode, 200)
        assert.equal(body.message, "ok")

        getProfile(profileName)(function (err, profile) {
            assert.ifError(err)
            assert.equal(profile.name, profileName)

            assert.end()
        })
    })
})

test("can delete profile", function (assert) {
    request({
        method: "DELETE",
        uri: "/profiles/" + profileName,
        json: true
    }, function (err, res, body) {
        assert.ifError(err)
        assert.equal(res.statusCode, 200)
        assert.equal(body.message, "ok")

        getProfile(profileName)(function (err, profile) {
            assert.ifError(err)
            assert.equal(profile, null)

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
