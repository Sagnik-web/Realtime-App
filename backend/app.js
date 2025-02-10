const express= require('express')
const cors = require('cors')
const app = express()
const path = require('path')

app.use(cors())
// Set the build output directory (update this to where your build files are located)
const buildDir = path.join(__dirname, 'dict'); // This should match the `outDir` set in your `vite.config.js`

// Serve static files from the build directory
app.use(express.static(buildDir));

module.exports = app
