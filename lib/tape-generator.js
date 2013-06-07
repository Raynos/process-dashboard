var tape = require("tape")
var async = require("continuable-generators")

module.exports = test

function test(name, opts, gen) {
    if (typeof opts === "function") {
        gen = opts
        opts = {}
    }

    tape(name, opts, function (assert) {
        async(gen)(assert, function (err) {
            assert.ifError(err)
            assert.end()
        })
    })
}
