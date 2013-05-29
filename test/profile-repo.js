var test = require("tape")
var path = require("path")
var fs = require("fs")
var process = require("process")

var ensureDirectory = require("../repo/ensure-directory")
var saveProfile = require("../repo/save-profile")
var getProfile = require("../repo/get-profile")
var getCommand = require("../repo/get-command")
var removeProfile = require("../repo/remove-profile")
var addCommand = require("../repo/add-command")
var editCommand = require("../repo/edit-command")
var getProfiles = require("../repo/get-profiles")

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
        name: "named-profile",
        commands: {
            "command one": {
                name: "command one",
                command: "node",
                args: "app.js",
            }
        }
    })(function (err) {
        assert.ifError(err)
        var loc = path.join(dir, "named-profile.json")

        fs.readFile(loc, function (err, str) {
            assert.ifError(err)
            var json = JSON.parse(str)

            assert.equal(json.name, "named-profile")

            assert.end()
        })
    })
})

test("getProfile reads from disk", function (assert) {
    saveProfile({
        name: "my-profile",
        commands: {
            "command one": {
                name: "command one",
                command: "node",
                args: ["app.js"]
            }
        }
    })(function (err) {
        assert.ifError(err)

        getProfile("my-profile")(function (err, profile) {
            assert.ifError(err)
            assert.equal(profile.name, "my-profile")
            var command = profile.commands["command one"]
            assert.equal(command.name, "command one")

            assert.end()
        })
    })
})

test("addCommand works", function (assert) {
    addCommand("my-profile", {
        name: "command two",
        command: "node",
        args: ["api.js"]
    })(function (err) {
        assert.ifError(err)

        getProfile("my-profile")(function (err, profile) {
            assert.ifError(err)

            var keys = Object.keys(profile.commands)
            var command = profile.commands["command two"]

            assert.equal(keys.length, 2)
            assert.equal(command.name, "command two")

            assert.end()
        })
    })
})

test("editCommand works", function (assert) {
    editCommand("my-profile", {
        name: "command two",
        args: ["api.js", "--debug"]
    })(function (err) {
        assert.ifError(err)

        getProfile("my-profile")(function (err, profile) {
            assert.ifError(err)

            var keys = Object.keys(profile.commands)
            var command = profile.commands["command two"]

            assert.equal(keys.length, 2)
            assert.equal(command.name, "command two")
            assert.equal(command.command, "node")
            assert.deepEqual(command.args, ["api.js", "--debug"])

            assert.end()
        })
    })
})

test("getCommand works", function (assert) {
    getCommand("my-profile", "command two")(function (err, command) {
        assert.ifError(err)

        assert.equal(command.name, "command two")
        assert.equal(command.command, "node")

        assert.end()
    })
})

test("getProfiles returns profiles", function (assert) {
    getProfiles()(function (err, profiles) {
        assert.ifError(err)
        assert.equal(profiles.length, 2)

        assert.equal(profiles[0].name, "my-profile")
        assert.equal(profiles[1].name, "named-profile")

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
