var http = require("http")
var console = require("console")

var config = require("./config/production.js")
var Router = require("./router.js")

var router = Router(config.repo, config.loadTemplate)
var server = http.createServer(router)

server.listen(config.port, function () {
    console.log("running process dashboard on", config.port)
})
