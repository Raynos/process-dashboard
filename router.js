var path = require("path")
var resolve = require("resolve").sync
var Router = require("routes-router")
var Methods = require("http-methods")
var NODE_ENV = require("node-env")
var RequireFresh = require("require-fresh")
var ServeBrowserify = require("serve-browserify")
var ServeLess = require("npm-less/serve")

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

module.exports = router

function addRoute(uri, module) {
    var handler = require(module)
    if (typeof handler === "object") {
        handler = Methods(handler)
    }

    router.addRoute(uri, function (req, res, params, splats) {
        handler(req, res, {
            params: params,
            splats: splats,
            load: Loader(path.dirname(module)),
            loadTemplate: loadTemplate
        })
    })
}

function Loader(basedir) {
    var moduleCache = {}

    return load

    function load(moduleUri) {
        if (moduleCache[moduleUri]) {
            return moduleCache[moduleUri]
        }

        var resolution = resolve(moduleUri, { basedir: basedir })
        var module = moduleCache[moduleUri] = require(resolution)
        return module
    }
}
