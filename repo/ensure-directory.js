var fs = require("fs")
var path = require("path")
var env = require("process").env
var async = require("gens")
var both = require("gens/both")

// ensureDirectory := () => Continuable<String>
// ensureDirectory returns the directory where profiles are stored
module.exports = async(ensureDirectory)

function* ensureDirectory() {
    var configDir = path.join(home(), ".config")
    var configDirStat = yield both(fs.stat.bind(null, configDir))

    if (configDirStat[0]) {
        yield fs.mkdir.bind(null, configDir)
    }

    var processDashDir = path.join(configDir, processDashDirectory())
    var processDashDirStat = yield both(fs.stat.bind(null, processDashDir))

    if (processDashDirStat[0]) {
        yield fs.mkdir.bind(null, processDashDir)
    }

    return processDashDir
}

function processDashDirectory() {
    return env.PDASH_DIRECTORY || "process-dash"
}

function home() {
    return env.HOME || env.HOMEPATH || env.USERPROFILE
}
