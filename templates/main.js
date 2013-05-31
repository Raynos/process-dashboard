module.exports = Main

function Main(profiles) {
    profiles = []
    for (var i = 0; i < 100; i++) {
        profiles[i] = { name: String(i) }
    }

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

function profileItem(profile) {
    return ["li", profile.name]
}
