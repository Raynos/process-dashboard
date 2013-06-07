var test = require("tape")
var path = require("path")
var fs = require("fs")
var process = require("process")

var repo = require("../repo")

var dir = path.join(process.env.HOME,
    "/.config/test.process-dash")

test("nuke profiles for good measure", function (assert) {
    repo.nukeProfiles()(function (err) {
        assert.ifError(err)

        assert.end()
    })
})

test("ensureDirectory returns a directory", function (assert) {
    repo.ensureDirectory()(function (err, location) {
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

test("assert nukeProfiles kills directory", function (assert) {
    repo.nukeProfiles()(function (err) {
        assert.ifError(err)

        fs.stat(dir, function (err) {
            assert.equal(err.code, "ENOENT")

            assert.end()
        })
    })
})

test("saveProfile saves a profile to disk", function (assert) {
    repo.saveProfile({
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
    repo.saveProfile({
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

        repo.getProfile("my-profile")(function (err, profile) {
            assert.ifError(err)
            assert.equal(profile.name, "my-profile")
            var command = profile.commands["command one"]
            assert.equal(command.name, "command one")

            assert.end()
        })
    })
})

test("addCommand works", function (assert) {
    repo.addCommand("my-profile", {
        name: "command two",
        command: "node",
        args: ["api.js"]
    })(function (err) {
        assert.ifError(err)

        repo.getProfile("my-profile")(function (err, profile) {
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
    repo.editCommand("my-profile", {
        name: "command two",
        args: ["api.js", "--debug"]
    })(function (err) {
        assert.ifError(err)

        repo.getProfile("my-profile")(function (err, profile) {
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
    repo.getCommand("my-profile", "command two")(function (err, command) {
        assert.ifError(err)

        assert.equal(command.name, "command two")
        assert.equal(command.command, "node")

        assert.end()
    })
})

test("getProfiles returns profiles", function (assert) {
    repo.getProfiles()(function (err, profiles) {
        assert.ifError(err)
        assert.equal(profiles.length, 2)

        assert.equal(profiles[0].name, "my-profile")
        assert.equal(profiles[1].name, "named-profile")

        assert.end()
    })
})

test("removeProfile removes from disk", function (assert) {
    repo.removeProfile("my-profile")(function (err) {
        assert.ifError(err)
        var loc = path.join(dir, "my-profile.json")


        fs.stat(loc, function (err) {
            assert.ok(err)
            assert.equal(err.code, "ENOENT")

            assert.end()
        })
    })
})

test("cleanup disk", function (assert) {
    repo.nukeProfiles()(function (err) {
        assert.ifError(err)

        assert.end()
    })
})
