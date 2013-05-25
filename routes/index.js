var path = require("path")
var Router = require("routes-router")
var ServeBrowserify = require("serve-browserify")
var ServeLess = require("npm-less/serve")

var router = Router()

router.addRoute("/js/:appName",
    ServeBrowserify(path.join(__dirname, "..", "browser")))
router.addRoute("/css/:appName",
    ServeLess(path.join(__dirname, "..", "styles")))

router.addRoute("/", require("./home.js"))

module.exports = router
