var jsonBody = require("body/json")
var sendJson = require("send-data/json")
var async = require("gens")

module.exports = function CommandItem(repo) {
    return {
        "PUT": async(putCommand),
        "DELETE": async(deleteCommand),
        "PATCH": async(patchCommand)
    }

    function* putCommand(req, res, opts) {
        var command = yield jsonBody(req, res)
        yield repo.addCommand(opts.params.profileId, command)
        sendJson(req, res, { message: "ok" })
    }

    function* deleteCommand(req, res, opts) {
        yield repo.removeCommand(opts.params.profileId, opts.params.id)
        sendJson(req, res, { message: "ok" })
    }

    function* patchCommand(req, res, opts) {
        var command = yield jsonBody(req, res)
        yield repo.editCommand(opts.params.profileId, command)
        sendJson(req, res, { message: "ok" })
    }
}
