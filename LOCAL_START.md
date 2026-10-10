# Run Meetu Clothes on your own computer

The cloud workspace and your computer are separate machines. A server started in the cloud does not listen on your computer's port 3001. To use the browser on your own computer, start the site there.

1. Install Node.js 24 and Git if they are not already available.
2. Open a terminal and clone the project:

```sh
git clone https://github.com/anmolgupta22/Meetu-Clothes-Shop.git
cd Meetu-Clothes-Shop
```

   You can also extract the project archive and open a terminal inside its Meetu-Clothes-Shop folder (the folder containing package.json).

3. Install the dependencies and start the website:

```sh
npm ci
npm run dev -- --strictPort
```

4. Keep this terminal open. After Vite reports that it is ready on port 3001, reload the existing browser tab for port 3001.

The development command already selects port 3001 and binds to all interfaces. If port 3001 is occupied, identify the existing process before stopping it; do not stop an unrelated application blindly. The website has no backend or required credentials.

For a production build, run `npm run build`. Public deployment needs a static host configured to return index.html for application routes. An environment publication alone does not deploy a public website.
