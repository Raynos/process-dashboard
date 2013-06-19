var test = require("tape")
var jsonml = require("jsonml-stringify/dom")

var ProfilesUI = require("../../../browser/profiles/ui.js")
var ProfilesTemplate = require("../../../templates/profile.js")

test("ProfilesUI is a function", function (assert) {
    assert.equal(typeof ProfilesUI, "function")

    assert.end()
})

test("create profileWidget", function (assert) {
    var templ = ["div", ProfilesTemplate([])]
    var elem = jsonml(templ)
    var profileWidget = ProfilesUI(elem)

    assert.equal(typeof profileWidget.addProfile, "function")
    assert.equal(typeof profileWidget.removeProfile, "function")

    assert.end()
})
