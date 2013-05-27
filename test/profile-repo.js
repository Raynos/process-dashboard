var test = require("tape")
var path = require("path")
var fs = require("fs")
var process = require("process")

var Profile = require("../../repo")

var pdashDirectoryUri = path.join(process.env.HOME,
    "/.config/test.process-dash")

test("ensureDirectory returns a directory", function (assert) {
    Profile.ensureDirectory()(function (err, location) {
        assert.ifError(err)
        assert.equal(location, path.join(process.env.HOME,
            ".config", "test.process-dash"))

        fs.stat(pdashDirectoryUri, function (err, stat) {
            assert.ifError(err)
            assert.ok(stat)

            assert.end()
        })
    })
})

test("saveProfile saves a profile to disk", function (assert) {
    Profile.saveProfile({
        profileName: "my-profile",
        commands: [{
            name: "command one",
            command: "node",
            args: "app.js",
        }]
    })(function (err, res) {
        assert.ifError(err)
        assert.equal(res.created, true)

        assert.end()
    })
})
