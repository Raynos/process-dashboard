var xhr = require("xhr")

module.exports = {
    addProfile: addProfile,
    removeProfile: removeProfile
}

function addProfile(profile, callback) {
    xhr({
        uri: "/profiles/" + profile.name,
        method: "PUT",
        json: profile
    }, callback)
}

function removeProfile(profileName, callback) {
    xhr({
        uri: "/profiles/" + profileName,
        method: "DELETE"
    }, callback)
}
