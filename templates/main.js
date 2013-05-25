module.exports = Main

function Main() {
    return ["html", [
        ["head", [
            ["meta", { charset: "utf-8" }],
            ["title", "Process dashboard"],
            ["link", { rel: "stylesheet", href: "/css/main" }]
        ]],
        ["body", { class: "main" }, [
            ["p", "Hello process dashboard"],
            ["script", { src: "/js/main" }]
        ]]
    ]]
}
