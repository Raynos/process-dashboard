var path = require("path")
var Router = require("routes-router")
var Methods = require("http-methods")
var NODE_ENV = require("node-env")
var RequireFresh = require("require-fresh")
var ServeBrowserify = require("serve-browserify")
var ServeLess = require("npm-less/serve")

var ModuleLoader = require("./lib/module-loader")

var loadTemplate = RequireFresh({
    dir: path.join(__dirname, "templates"),
    watch: NODE_ENV !== "production"
})

var router = Router()

// assets & statics
router.addRoute("/js/:appName",
    ServeBrowserify(path.join(__dirname, "browser")))
router.addRoute("/css/:appName",
    ServeLess(path.join(__dirname, "styles")))

addRoute("/", "./routes/home.js")
addRoute("/profiles/:id", "./routes/profiles-item.js")

router.close = function () {
    loadTemplate.close()
}

module.exports = router

function addRoute(uri, module) {
    var handler = require(module)
    if (typeof handler === "object") {
        handler = Methods(handler)
    }

    router.addRoute(uri, function onRoute(req, res, params, splats) {
        handler(req, res, {
            params: params,
            splats: splats,
            load: ModuleLoader(path.dirname(module)),
            loadTemplate: loadTemplate
        })
    })
}
