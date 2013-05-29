var test = require("tape")
var path = require("path")
var fs = require("fs")
var process = require("process")

var ensureDirectory = require("../repo/ensure-directory")
var saveProfile = require("../repo/save-profile")
var getProfile = require("../repo/get-profile")
var getCommand = require("../repo/get-command")
var removeProfile = require("../repo/remove-profile")

var dir = path.join(process.env.HOME,
    "/.config/test.process-dash")

test("ensureDirectory returns a directory", function (assert) {
    ensureDirectory()(function (err, location) {
        assert.ifError(err)
        assert.equal(location, path.join(process.env.HOME,
            ".config", "test.process-dash"))

        fs.stat(dir, function (err, stat) {
            assert.ifError(err)
            assert.ok(stat)

            assert.end()
        })
    })
})

test("saveProfile saves a profile to disk", function (assert) {
    saveProfile({
        profileName: "my-profile",
        commands: [{
            name: "command one",
            command: "node",
            args: "app.js",
        }]
    })(function (err) {
        assert.ifError(err)
        var loc = path.join(dir, "my-profile.json")

        fs.readFile(loc, function (err, str) {
            assert.ifError(err)
            var json = JSON.parse(str)

            assert.equal(json.profileName, "my-profile")

            fs.unlink(loc, function (err) {
                assert.ifError(err)

                assert.end()
            })
        })
    })
})

test("getProfile reads from disk", function (assert) {
    saveProfile({
        profileName: "my-profile",
        commands: [{
            name: "command one",
            command: "node",
            args: "app.js",
        }]
    })(function (err) {
        assert.ifError(err)

        getProfile("my-profile")(function (err, profile) {
            assert.ifError(err)
            assert.equal(profile.profileName, "my-profile")
            assert.equal(profile.commands.length, 1)
            assert.equal(profile.commands[0].name, "command one")

            assert.end()
        })
    })
})

test("getCommand works", function (assert) {
    getCommand("my-profile", "command one")(function (err, command) {
        assert.ifError(err)

        assert.equal(command.name, "command one")
        assert.equal(command.command, "node")

        assert.end()
    })
})

test("removeProfile removes from disk", function (assert) {
    removeProfile("my-profile")(function (err) {
        assert.ifError(err)
        var loc = path.join(dir, "my-profile.json")


        fs.stat(loc, function (err) {
            assert.ok(err)
            assert.equal(err.code, "ENOENT")

            assert.end()
        })
    })
})
