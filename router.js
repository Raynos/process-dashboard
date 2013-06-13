var path = require("path")
var RoutesRouter = require("routes-router")
var Methods = require("http-methods")
var ServeBrowserify = require("serve-browserify")
var ServeLess = require("npm-less/serve")
var sendError = require("send-data/error")

var Home = require("./routes/home.js")
var ProfileItem = require("./routes/profiles-item.js")

module.exports = Router

function Router(repo, loadTemplate) {
    var router = RoutesRouter()

    // assets & statics
    router.addRoute("/js/:appName", ServeBrowserify({
        root: path.join(__dirname, "browser")
    }))
    router.addRoute("/css/:appName", ServeLess({
        root: path.join(__dirname, "styles")
    }))

    // Load and inject dependencies into route handlers
    addRoute("/", Home(repo, loadTemplate))
    addRoute("/profiles/:id", ProfileItem(repo))

    router.close = function () {
        loadTemplate.close()
    }

    return router

    function addRoute(uri, handler) {
        if (typeof handler === "object") {
            handler = Methods(handler)
        }

        router.addRoute(uri, HandleRoute(handler))
    }
}

function HandleRoute(handler) {
    return function onRoute(req, res, params, splats) {
        handler(req, res, {
            params: params,
            splats: splats
        }, writeError)

        function writeError(err) {
            if (err) {
                sendError(req, res, err)
            }
        }
    }
}
