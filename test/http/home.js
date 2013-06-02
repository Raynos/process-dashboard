var test = require("tape")

var server = require("./_server")
var request = server.request

test("start server", function (assert) {
    server.start(assert)
})

test("request main site", function (assert) {
    request("/", function (err, res, body) {
        assert.ifError(err)
        assert.equal(res.statusCode, 200)
        assert.ok(body)

        console.log("body", body)

        assert.end()
    })
})

test("close server", function (assert) {
    server.close(assert)
})
