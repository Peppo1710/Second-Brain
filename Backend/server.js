const express = require('express');
const connect = require('./db.js'); // 
const mainRouting = require('./Routes/index.js')

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Use the router
app.use('/api', mainRouting);

// Start the app only after DB connection
async function startServer() {
    try {
        await connect(); // Wait for DB connection
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1); // Exit if DB fails
    }
}

startServer();
