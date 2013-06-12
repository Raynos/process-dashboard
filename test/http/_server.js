var http = require("http")
var console = require("console")
var cache = require("continuable-cache")

var RequestProxy = require("../../lib/request-proxy.js")
var Router = require("../../router.js")
var config = require("../../config/production.js")

var router = Router(config.repo, config.loadTemplate)
var PORT = 2000 + Math.round(10000 * Math.random())
var cachedStartServer = cache(startServer)

var counter = 0
var server = module.exports = {
    start: function () {
        counter++
        cachedStartServer()
    },
    request: RequestProxy(PORT),
    close: function () {
        return function continuable(callback) {
            counter--

            if (counter === 0) {
                router.close()
                server.httpServer.close(callback)
            } else {
                callback(null)
            }
        }
    }
}

function startServer() {
    var httpServer = server.httpServer = http.createServer(router)

    httpServer.listen(PORT, function () {
        console.log("started server on", PORT)
    })
}
