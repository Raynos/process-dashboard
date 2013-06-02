var process = require("process")

// Set the location of the profile files to a test directory
process.env.PDASH_DIRECTORY = "test.process-dash"

require("./profile-repo.js")

require("./http/home.js")
require("./http/profiles-item.js")
