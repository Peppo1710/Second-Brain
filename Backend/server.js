const express = require('express');
const connect = require('./db.js'); // 
const mainRouting = require('./Routes/index.js')
const cors = require('cors')
const session = require('express-session');
const passport = require('passport');




const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());



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
