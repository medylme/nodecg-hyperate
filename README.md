# nodecg-hyperate

A NodeCG bundle that can interact with the HypeRate heartrate monitor API.

## Details

- Contains dashboard panel to control tracked heartrates.
- Example graphics that display the tracked heartrates.
- Comes with [TailwindCSS](https://tailwindcss.com/) for styling.
- Uses [vue3-odometer](https://github.com/vangleer/vue3-odometer) for number animations.

## Installation

- You will need your own API key from HypeRate for this bundle to work, and set it in `.env` as `HYPERATE_API_KEY`.
- Install NodeCG and this bundle as you would any other NodeCG bundle.
- Run `npm install` (or use your own package manager) in the bundle directory.
- Run `npm watch` for development, or `npm build` for production.
- Start NodeCG with `npm start`, if it isn't already running.

## Relevant Commands

- `build`: Build written code for use in production.
- `start`: Start NodeCG.
- `watch`: Build code and watch for changes, for use in development.

- `autofix`: Automatically fix any possible linting errors using ESLint.
- `autofix:browser`: See above, but only for browser based code.
- `autofix:extension`: See above, but only for extension based code/typings.
- `build:browser`: See above, but only for browser based code.
- `build:extension`: See above, but only for extension based code.
- `clean`: Clean up all built/watched files.
- `lint`: Finds any possible linting errors using ESLint, but does not fix them.
- `lint:browser`: See above, but only for browser based code.
- `lint:extension`: See above, but only for extension based code/typings.
- `prebuild`: Alias for `clean`, will automatically run before `build` if called.
- `schema-types`: Create TypeScript typings for schemas/`Configschema.json` using `nodecg-cli`.
