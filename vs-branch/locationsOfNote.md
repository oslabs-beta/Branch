# Important Locations

## Config Files

### package.json
- `main` - Entry point of application
- `contributes` - Items contributed to VSCode by extension
  - `commands` - List of commands contributed
- `scripts`
  - `esbuild` - Uses esbuild to uglify/minify `main.js` (formerly `tree.js`)

### launch.json
- `configurations` - list of debug/run configurations
  - `args: --extensionDevelopmentPath` - Tells VSCode which directory to launch the extension from (with ${workspaceFolder} being the directory currently open in VSCode)

## Directories

### `out`
- Uglified/Minified version of files in `src` directory, created by `esbuild`

### `src`
- Where all of the `.js` files we write live

### `.vscode`
- Files for vscode run configuration

