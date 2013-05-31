module.exports = head

function head(title) {
    return ["head", [
        ["meta", { charset: "utf-8" }],
        ["title", title],
        ["link", { rel: "stylesheet", href: "/css/main" }]
    ]]
}
