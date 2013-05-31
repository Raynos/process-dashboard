var xhr = require("xhr")

module.exports = {
    addProfile: addProfile
}

function addProfile(profile, callback) {
    xhr({
        uri: "/profiles/" + profile.name,
        method: "PUT",
        json: profile
    }, callback)
}
