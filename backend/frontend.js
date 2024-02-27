const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3500; // Choose the port for your server

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes by serving the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, '192.168.0.132', () => {
    console.log(`Server is running on http://192.168.0.132:${PORT}`);
});
