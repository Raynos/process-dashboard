var profileItem = require("./profile")

module.exports = Main

function Main(profiles) {
    return ["body.main", [
        [".sidebar", { "data-marker": "profiles" }, [
            ["h2.profile-header", "Profiles"],
            [".wrapper", [
                ["ul.profiles", {
                    "data-marker": "profilesList"
                }, profiles.map(profileItem)],
                [".profile-controls", [
                    ["button", { "data-marker": "addProfile" },
                        "Add Profile"],
                    ["input", {
                        "data-marker": "profileName",
                        "placeholder": "Name your new profile"
                    }]
                ]]
            ]]
        ]],
        ["script", { src: "/js/main" }]
    ]]
}
