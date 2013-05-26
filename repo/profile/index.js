var getProfile = require("./get-profile")
var getProfiles = require("./get-profiles")
var addCommand = require("./add-command")
var editCommand = require("./edit-command")
var getCommand = require("./get-command")
var createProfile = require("./create-profile")
var ensureDirectory = require("./ensure-directory")
var saveProfile = require("./save-profile")

/*  What is a profile?

    A profile is a document with command information.

    {
        commands: Array<Command>,
        profileName: String
    }

    A Command is a record of

    {
        name: String,
        id: uuid(),
        command: "node",
        args: ["app.js"],
        options: {
            cwd: "~/repos/Express",
            env: process.env & {
                NODE_ENV: "development"
            }
        }
    }

    You can also get all the profiles. All the profiles contains
        some more meta data

    {
        profiles: [Profile],
        defaultProfile: String,
        sorted: [String]
    }

    Like what the defaultProfile is and what the sorted index
        of the profiles looks like
*/

module.exports = {
    getProfile: getProfile,
    getProfiles: getProfiles,
    addCommand: addCommand,
    editCommand: editCommand,
    getCommand: getCommand,
    createProfile: createProfile,
    ensureDirectory: ensureDirectory,
    saveProfile: saveProfile
}
