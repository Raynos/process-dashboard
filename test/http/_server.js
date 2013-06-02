var http = require("http")
var console = require("console")
var cache = require("continuable-cache")

var RequestProxy = require("../../lib/request-proxy")
var router = require("../../router")

var PORT = 2000 + Math.round(10000 * Math.random())
var cachedStartServer = cache(startServer)
var counter = 0

var server = module.exports = {
    start: function () {
        counter++
        cachedStartServer()
    },
    request: RequestProxy(PORT),
    close: function (callback) {
        if (isTapeAssert(callback)) {
            callback = callbackFromTapeAssert(callback)
        }

        counter--

        if (counter === 0) {
            router.close()
            server.httpServer.close(callback)
        } else {
            callback(null)
        }
    }
}

function startServer() {
    var httpServer = server.httpServer = http.createServer(router)

    httpServer.listen(PORT, function () {
        console.log("started server on", PORT)
    })
}

function callbackFromTapeAssert(assert) {
    return function callback(err) {
        assert.ifError(err)

        assert.end()
    }
}

function isTapeAssert(assert) {
    return typeof assert === "object" && assert && assert.end
}
