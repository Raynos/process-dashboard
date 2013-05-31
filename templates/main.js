var profileItem = require("./profile")

module.exports = Main

function Main(profiles) {
    return ["body.main", [
        [".sidebar", [
            [".slider"],
            [".header", [
                ["h2.profile-header", "Profiles"]
            ]],
            [".profiles", [
                ["ul", profiles.map(profileItem)]
            ]],
            [".footer", [
                ["button", {
                    "data-marker": "addProfile"
                }, "Add Profile"]
            ]]
        ]],
        ["script", { src: "/js/main" }]
    ]]
}
