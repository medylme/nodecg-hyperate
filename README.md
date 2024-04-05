# nodecg-hyperate

A NodeCG bundle that can interact with the [HypeRate](https://www.hyperate.io/) API.

## Details

- Contains dashboard panel to control tracked heartrates.
- Example graphics that display the tracked heartrates.
- Comes with [TailwindCSS](https://tailwindcss.com/) for styling.
- Uses [vue3-odometer](https://github.com/vangleer/vue3-odometer) for number animations.
- You will need an API key from HypeRate for this bundle to work, that can be requested [here](https://www.hyperate.io/api-free-request).

## Installation

- Clone this repo to your NodeCG `bundles` folder.
- Add your HypeRate API key in `.env` as `HYPERATE_API_KEY`.
- Run `npm install` (or use your own package manager) in the bundle directory.
- Run `npm watch` for development, or `npm build` for production.
- Start NodeCG with `npm start`, if it isn't already running.

## Relevant Commands

- `build`: Build written code for use in production.
- `start`: Start parent NodeCG installation.
- `watch`: Build code and watch for changes, for use in development.

## Screenshots
### Dashboard - Panel
![image](https://github.com/medylme/nodecg-hyperate/assets/77020575/db4da516-1af2-4767-826a-c57f280d23f6)
### Graphics - Example Blank Style
![image](https://github.com/medylme/nodecg-hyperate/assets/77020575/352d6e4e-cd52-4d04-bcb9-3d914d1a03f4)
### Graphics - Example 'dyl' Style
![image](https://github.com/medylme/nodecg-hyperate/assets/77020575/1e7e8e35-4676-48d9-8e3f-4f8982a33f86)

## Template
For more technical details, refer to the [nodecg-vue-ts-template](https://github.com/zoton2/nodecg-vue-ts-template) repository, as this is built off of that.
