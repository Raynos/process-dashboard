What is a profile?

A profile is a document with command information.

```js
{
    commands: Array<Command>,
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

You can also get all the profiles. All the profiles contains
    some more meta data

```js
{
    profiles: [Profile],
    defaultProfile: String,
    sorted: [String]
}
```

Like what the defaultProfile is and what the sorted index
    of the profiles looks like

On disk this looks like

```
~/.config/process-dash
    _meta.json
    profile-name-1.json
    profile-name-2.json
```
