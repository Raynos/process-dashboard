module.exports = Main

function Main(profiles) {
    profiles = []
    for (var i = 0; i < 100; i++) {
        profiles[i] = { name: String(i) }
    }

    return ["body.main", [
        [".sidebar", [
            ["h2.profile-header", "Profiles"],
            [".wrapper", [
                ["ul.profiles", profiles.map(profileItem)],
                [".profile-controls", [
                    ["button", { "data-marker": "addProfile" },
                        "Add Profile"]
                ]]
            ]]
        ]],
        ["script", { src: "/js/main" }]
    ]]
}

function profileItem(profile) {
    return ["li", profile.name]
}
