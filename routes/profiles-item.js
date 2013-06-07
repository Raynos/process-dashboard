var jsonBody = require("body/json")
var sendJson = require("send-data/json")
var async = require("continuable-generators")

module.exports = function ProfileItem(repo) {
    return {
        "PUT": async(putProfile),
        "DELETE": async(deleteProfile),
        uri: "/profiles/:id"
    }

    function* putProfile(req, res, opts) {
        var profile = yield jsonBody(req, res)
        yield repo.saveProfile(profile)
        sendJson(req, res, { message: "ok" })
    }

    function* deleteProfile(req, res, opts) {
        yield repo.removeProfile(opts.params.id)
        sendJson(req, res, { message: "ok" })
    }
}


