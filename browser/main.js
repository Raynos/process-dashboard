var document = require("global/document")
var unpack = require("unpack-element")

var Router = require("./lib/hash-router")
var client = require("./client")
var Profiles = require("./profiles")

// instantiate HTML5 #/ router
var router = Router()
// configure options to be passed to every sub app
var opts = {
    router: router,
    client: client
}
// extract top level elements
var elems = unpack(document.body)

// if elems.profiles then configure profiles sub app
if (elems.profiles) {
    Profiles(elems.profiles, opts)
}

// start router
router.applyChange()
