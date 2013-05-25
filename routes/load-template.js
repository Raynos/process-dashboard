var path = require("path")
var NODE_ENV = require("node-env")
var RequireFresh = require("require-fresh")

module.exports = RequireFresh({
    dir: path.join(__dirname, "..", "templates"),
    watch: NODE_ENV !== "production"
})
