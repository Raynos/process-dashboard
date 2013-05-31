var jsonBody = require("body/json")
var sendJson = require("send-data/json")
var sendError = require("send-data/error")
var chain = require("continuable/chain")

module.exports = {
    "PUT": putProfile,
    "DELETE": deleteProfile
}

function putProfile(req, res, opts) {
    var saveProfile = opts.load("../repo/save-profile.js")

    var body = jsonBody(req, res)

    var saved = chain(body, function (profile) {
        return saveProfile(profile)
    })

    saved(function (err) {
        if (err) {
            return sendError(req, res, err)
        }

        sendJson(req, res, { message: "ok" })
    })
}

function deleteProfile(req, res, opts) {
    var removeProfile = opts.load("../repo/remove-profile.js")

    removeProfile(opts.params.id)(function (err) {
        if (err) {
            return sendError(req, res, err)
        }

        sendJson(req, res, { message: "ok" })
    })
}
