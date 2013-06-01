var resolve = require("resolve").sync

module.exports = ModuleLoader

function ModuleLoader(basedir) {
    var moduleCache = {}

    return load

    function load(moduleUri) {
        if (moduleCache[moduleUri]) {
            return moduleCache[moduleUri]
        }

        var resolution = resolve(moduleUri, { basedir: basedir })
        var module = moduleCache[moduleUri] = require(resolution)
        return module
    }
}
