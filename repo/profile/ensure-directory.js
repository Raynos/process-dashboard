var fs = require("fs")
var path = require("path")
var console = require("console")
var process = require("process")
var env = process.env

var chain = require("continuable/chain")
var map = require("continuable/map")
var of = require("continuable/of")
var either = require("continuable/either")

// ensureDirectory := () => Continuable<String>
// ensureDirectory returns the directory where profiles are stored
module.exports = ensureDirectory

function ensureDirectory() {
    var homeDir = home()
    var configDir = path.join(homeDir, ".config")
    var configDirStat = fs.stat.bind(null, configDir)

    var configDirExists = either(configDirStat, function () {
        return fs.mkdir.bind(null, configDir)
    }, function (stat) {
        if (stat && !stat.isDirectory()) {
            console.error("~/.config directory exists but " +
                "it is not a directory")
            return process.exit(1)
        }

        return of()
    })

    var pdashFile = pdashDirectory()
    var pdashDir = path.join(configDir, pdashFile)
    var pdashDirStat = chain(configDirExists, function () {
        return fs.stat.bind(null, pdashDir)
    })



    console.log("config", configDir, pdashDir)

    var pdashDirExists = either(pdashDirStat, function () {
        return fs.mkdir.bind(null, pdashDir)
    }, function (stat) {
        if (stat && !stat.isDirectory()) {
            console.error("~/.config/" + pdashFile + " directory exists but" +
                " it is not a directory")
            return process.exit(1)
        }

        return of()
    })

    return map(pdashDirExists, function () {
        return pdashDir
    })
}

function pdashDirectory() {
    return env.PDASH_DIRECTORY || "process-dash"
}

function home() {
    return env.HOME || env.HOMEPATH || env.USERPROFILE
}
