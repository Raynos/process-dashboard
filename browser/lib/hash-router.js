var Router = require("routes")
var location = require("global/document").location
var window = require("global/window")

module.exports = HashRouter

function HashRouter() {
    var router = Router()

    router.go = function go(uri) {
        location.hash = "#" + uri
    }
    router.applyChange = applyChange

    window.addEventListener("hashchange", applyChange)

    return router

    function applyChange(event) {
        var hash = location.hash.substring(1)

        var route = router.match(hash)
        if (route) {
            route.fn(hash, {
                params: route.params,
                splats: route.splats,
                newURL: event ? event.newURL : location.href,
                oldURL: event ? event.oldURL : location.href
            })
        }
    }
}
