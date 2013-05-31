var ENTER = 13

module.exports = submit

function submit(elems, listener) {
    Object.keys(elems).forEach(function (key) {
        var elem = elems[key]

        if (elem.tagName === "BUTTON") {
            elem.addEventListener("click", listener)
        } else if (elem.tagName === "INPUT") {
            elem.addEventListener("keypress", onenter)
        }
    })

    function onenter(event) {
        if (event.which === ENTER) {
            listener(event)
        }
    }
}
