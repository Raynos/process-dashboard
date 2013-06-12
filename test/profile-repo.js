var test = require("tape-continuable")
var path = require("path")
var fs = require("fs")
var process = require("process")
var async = require("gens")
var both = require("gens/both")

var repo = require("../repo")

var dir = path.join(process.env.HOME,
    "/.config/test.process-dash")

test("nuke profiles for good measure", async(function* (assert) {
    yield repo.nukeProfiles()
}))

test("ensureDirectory returns a directory", async(function* (assert) {
    var location = yield repo.ensureDirectory()
    assert.equal(location, path.join(process.env.HOME,
        ".config", "test.process-dash"))

    var stat = yield fs.stat.bind(null, dir)
    assert.ok(stat)
}))

test("assert nukeProfiles kills directory", async(function* (assert) {
    yield repo.nukeProfiles()

    var data = yield both(fs.stat.bind(null, dir))
    assert.equal(data[0].code, "ENOENT")
}))

test("saveProfile saves a profile to disk", async(function* (assert) {
    yield repo.saveProfile({
        name: "named-profile",
        commands: {
            "command one": {
                name: "command one",
                command: "node",
                args: "app.js",
            }
        }
    })
    var loc = path.join(dir, "named-profile.json")
    var str = yield fs.readFile.bind(null, loc)

    var json = JSON.parse(str)
    assert.equal(json.name, "named-profile")
}))

test("getProfile reads from disk", async(function* (assert) {
    yield repo.saveProfile({
        name: "my-profile",
        commands: {
            "command one": {
                name: "command one",
                command: "node",
                args: ["app.js"]
            }
        }
    })

    var profile = yield repo.getProfile("my-profile")
    assert.equal(profile.name, "my-profile")
    var command = profile.commands["command one"]
    assert.equal(command.name, "command one")
}))

test("addCommand works", async(function* (assert) {
    yield repo.addCommand("my-profile", {
        name: "command two",
        command: "node",
        args: ["api.js"]
    })

    var profile = yield repo.getProfile("my-profile")
    var keys = Object.keys(profile.commands)
    var command = profile.commands["command two"]

    assert.equal(keys.length, 2)
    assert.equal(command.name, "command two")
}))

test("editCommand works", async(function* (assert) {
    yield repo.editCommand("my-profile", {
        name: "command two",
        args: ["api.js", "--debug"]
    })

    var profile = yield repo.getProfile("my-profile")

    var keys = Object.keys(profile.commands)
    var command = profile.commands["command two"]

    assert.equal(keys.length, 2)
    assert.equal(command.name, "command two")
    assert.equal(command.command, "node")
    assert.deepEqual(command.args, ["api.js", "--debug"])
}))

test("getCommand works", async(function* (assert) {
    var command = yield repo.getCommand("my-profile", "command two")

    assert.equal(command.name, "command two")
    assert.equal(command.command, "node")
}))

test("getProfiles returns profiles", async(function* (assert) {
    var profiles = yield repo.getProfiles()
    assert.equal(profiles.length, 2)

    assert.equal(profiles[0].name, "my-profile")
    assert.equal(profiles[1].name, "named-profile")
}))

test("removeProfile removes from disk", async(function* (assert) {
    yield repo.removeProfile("my-profile")

    var loc = path.join(dir, "my-profile.json")
    var data = yield both(fs.stat.bind(null, loc))
    assert.equal(data[0].code, "ENOENT")
}))

test("cleanup disk", async(function* (assert) {
    yield repo.nukeProfiles()
}))
