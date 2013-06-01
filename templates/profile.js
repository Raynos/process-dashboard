module.exports = Profiles

function Profiles(profiles) {
    return [
        [".slider"],
        [".header", [
            ["h2.profile-header", "Profiles"]
        ]],
        [".profiles", [
            ["ul", {
                "data-marker": "profilesList"
            }, profiles.map(ProfileItem)]
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
    ]
}

function ProfileItem(profile) {
    return ["li.profile-item", {
        "data-marker": "profiles." + profile.name
    }, [
        ["span.profile-name", profile.name],
        ["a", { href: "#/profiles/" + profile.name + "/delete" }, "X"]
    ]]
}
