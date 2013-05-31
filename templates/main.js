module.exports = Main

function Main(profiles) {
    return ["body", { class: "main" }, [
        ["p", "Hello process dashboard"],
        ["script", { src: "/js/main" }]
    ]]
}
