var Profiles = require("./profile")

module.exports = Main

function Main(data) {
    return ["body", [
        [".sidebar", {
            "data-marker-root": "profiles"
        }, Profiles(data.profiles)],
        [".main", {
            "data-marker-root": "commands",
        }, Commands(data.mainProfile)],
        ["script", { src: "/js/main" }]
    ]]
}

function Commands(mainProfile) {
    return [
        ["h2.command-header", mainProfile.name],
        ["ul", {
            "data-marker": "commandsList"
        }, []]
    ]
}
