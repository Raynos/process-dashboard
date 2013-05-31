module.exports = profileItem

function profileItem(profile) {
    return ["li", {
        "data-marker": "profiles." + profile.name
    }, [
        ["span", profile.name],
        ["span", "&nbsp;"],
        ["a", { href: "#/profiles/" + profile.name + "/delete" }, "X"]
    ]]
}
