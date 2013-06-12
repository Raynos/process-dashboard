var NODE_ENV = require("node-env")
var path = require("path")
var argv = require("optimist").argv
var RequireFresh = require("require-fresh")

var repo = require("../repo")

var loadTemplate = RequireFresh({
    dir: path.join(__dirname, "..", "templates"),
    watch: NODE_ENV !== "production"
})
var PORT = argv.port || argv.p || 5842

module.exports = {
    repo: repo,
    loadTemplate: loadTemplate,
    port: PORT
}
