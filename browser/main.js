var document = require("global/document")
var window = require("global/window")
var unpack = require("unpack-element")
var Router = require("hash-router")
var xhr = require("xhr")

var Client = require("./client")
var Profiles = require("./profiles")

// instantiate HTML5 #/ router
var router = Router()
// configure options to be passed to every sub app
var opts = {
    router: router,
    client: Client(xhr)
}
// extract top level elements
var elems = unpack(document.body)

// if elems.profiles then configure profiles sub app
if (elems.profiles) {
    Profiles(elems.profiles, opts)
}

// start router
window.addEventListener("hashchange", router)
router()
