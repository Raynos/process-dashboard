var jsonBody = require("body/json")
var sendJson = require("send-data/json")
var sendError = require("send-data/error")
var chain = require("continuable/chain")
var map = require("continuable/map")

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
    var result = map(saved, function () {
        return { message: "ok" }
    })

    writeJSON(req, res, result)
}

function deleteProfile(req, res, opts) {
    var removeProfile = opts.load("../repo/remove-profile.js")

    var removal = removeProfile(opts.params.id)
    var result = map(removal, function () {
        return { message: "ok" }
    })

    writeJSON(req, res, result)
}

function writeJSON(req, res, continuable) {
    continuable(function (err, value) {
        if (err) {
            return sendError(req, res, err)
        }

        sendJson(req, res, value)
    })
}
