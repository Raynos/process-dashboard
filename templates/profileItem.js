module.exports = ProfileItem

function ProfileItem(profile) {
    return ["li.profile-item", {
        "data-marker": "profiles." + profile.name
    }, [
        ["span.profile-name", profile.name],
        ["a", { href: "#/profiles/" + profile.name + "/delete" }, "X"]
    ]]
}