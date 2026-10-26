# Context bar

A status line for [Claude Code](https://claude.com/claude-code) that shows how much of the context window the session has used.

```
Opus 5.5 │ my-project (main) │ ███████░░░ 72%
```

- **Model** in dim text.
- **Current folder**, with the git branch in brackets when there is one.
- **Context used** as a 10-block bar and a percentage. Green below 50%, yellow below 65%, orange below 80%, red from 80%.

The percentage is measured against the model's full context window, as reported by Claude Code.

## Requirements

- Claude Code
- Node.js on your `PATH`

## Install with an agent

Paste this into a Claude Code session:

```text
Install the context bar status line from https://github.com/thomasguillot/context-bar:
1. Download https://raw.githubusercontent.com/thomasguillot/context-bar/main/context-bar.js to ~/.claude/context-bar.js.
2. In ~/.claude/settings.json, set "statusLine" to {"type": "command", "command": "node \"<absolute path to ~/.claude/context-bar.js>\""}. Keep every other key as it is. If a "statusLine" entry already exists, show it to me and ask before replacing it.
3. Test it with: echo '{"model":{"display_name":"Opus"},"workspace":{"current_dir":"'"$PWD"'"},"context_window":{"used_percentage":42}}' | node ~/.claude/context-bar.js
```

## Install by hand

1. Download the script:

   ```sh
   curl -fsSL https://raw.githubusercontent.com/thomasguillot/context-bar/main/context-bar.js -o ~/.claude/context-bar.js
   ```

2. Add this to `~/.claude/settings.json`, replacing `<you>` with your username:

   ```json
   "statusLine": {
     "type": "command",
     "command": "node \"/Users/<you>/.claude/context-bar.js\""
   }
   ```

The status line appears after the next message in any open session.

## Update

Run the install again. It overwrites `~/.claude/context-bar.js` with the latest version.

## Uninstall

Remove the `statusLine` entry from `~/.claude/settings.json` and delete `~/.claude/context-bar.js`.

## License

[MIT](LICENSE)
