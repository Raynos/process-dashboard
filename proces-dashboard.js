var http = require("http")
var console = require("console")
var argv = require("optimist").argv

var router = require("./router")

var PORT = argv.port || argv.p || 5842
var server = http.createServer(router)

server.listen(PORT, function () {
    console.log("running process dashboard on", PORT)
})
