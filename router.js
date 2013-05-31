var path = require("path")
var resolve = require("resolve").sync
var Router = require("routes-router")
var Methods = require("http-methods")
var ServeBrowserify = require("serve-browserify")
var ServeLess = require("npm-less/serve")

var router = Router()

// assets & statics
router.addRoute("/js/:appName",
    ServeBrowserify(path.join(__dirname, "..", "browser")))
router.addRoute("/css/:appName",
    ServeLess(path.join(__dirname, "..", "styles")))

addRoute("/", "./routes/home.js")

module.exports = router

function addRoute(uri, module) {
    var handler = require(module)
    if (typeof handler === "object") {
        handler = Methods(handler)
    }

    router.addRoute(uri, function (req, res, params, splats) {
        var basedir = path.dirname(module)
        var moduleCache = {}

        handler(req, res, {
            params: params,
            splats: splats,
            load: function load(moduleUri) {
                if (moduleCache[moduleUri]) {
                    return moduleCache[moduleUri]
                }

                var resolution = resolve(moduleUri, { basedir: basedir })
                var module = moduleCache[moduleUri] = require(resolution)
                return module
            }
        })
    })
}
