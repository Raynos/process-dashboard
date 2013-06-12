var test = require("tape")

var Client = require("../../browser/client")

test("client.addProfile", function (assert) {
    var _err = {}, _value = {}

    var client = Client(function xhr(opts, callback) {
        assert.equal(opts.uri, "/profiles/foobar")
        assert.equal(opts.method, "PUT")
        assert.deepEqual(opts.json, {
            name: "foobar"
        })

        callback(_err, _value)
    })

    client.addProfile({
        name: "foobar"
    }, function (err, value) {
        assert.equal(err, _err)
        assert.equal(value, _value)

        assert.end()
    })
})
