var http = require("http")
var path = require("path")
var console = require("console")
var Router = require("routes-router")
var argv = require("optimist").argv
var ecstatic = require("ecstatic")

var ServeBrowserify = require("serve-browserify")

var PORT = argv.port || argv.p || 5842
var router = Router()
var staticHandler = ecstatic({
    root: path.join(__dirname, "static"),
    autoIndex: true
})

router.addRoute("/", staticHandler)
router.addRoute("/browserify/:appName",
    ServeBrowserify(path.join(__dirname, "browser")))

var server = http.createServer(router)

server.listen(PORT, function () {
    console.log("running process dashboard on", PORT)
})