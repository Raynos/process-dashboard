What is a profile?

A profile is a document with command information.

```js
{
    commands: Object<String, Command>,
    profileName: String
}
```

A Command is a record of

```js
{
    name: String,
    command: "node",
    args: ["app.js"],
    options: {
        cwd: "~/repos/Express",
        env: process.env & {
            NODE_ENV: "development"
        }
    }
}
```

On disk this looks like

```
~/.config/process-dash
    profile-name-1.json
    profile-name-2.json
```
