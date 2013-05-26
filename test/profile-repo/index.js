var test = require("tape")
var path = require("path")
var fs = require("fs")
var process = require("process")

var Profile = require("../../repo/profile")

test("ensureDirectory returns a directory", function (assert) {
    var pdashDir = Profile.ensureDirectory()

    pdashDir(function (err, location) {
        assert.ifError(err)
        assert.equal(location, path.join(process.env.HOME,
            ".config", "test.process-dash"))

        assert.end()
    })
})

test("ensureDirectory created the directory", function (assert) {
    fs.stat(path.join(process.env.HOME, "/.config/test.process-dash"),
        function (err, stat) {
            assert.ifError(err)
            assert.ok(stat)

            assert.end()
        })
})
