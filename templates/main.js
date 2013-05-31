var profileItem = require("./profile")

module.exports = Main

function Main(profiles) {
    return ["body.main", [
        [".sidebar", { "data-marker": "profiles" }, [
            [".slider"],
            [".header", [
                ["h2.profile-header", "Profiles"]
            ]],
            [".profiles", [
                ["ul", {
                    "data-marker": "profilesList"
                }, profiles.map(profileItem)]
            ]],
            [".footer", [
                ["button", {
                    "data-marker": "addProfile"
                }, "Add Profile"],
                ["input", {
                    "data-marker": "profileName",
                    "placeholder": "Name your new profile"
                }]
            ]]
        ]],
        ["script", { src: "/js/main" }]
    ]]
}
