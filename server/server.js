const app = require("./app"); // Import your app.js
const config = require("./app/config"); // Import configuration
const mongoose = require("mongoose"); // MongoDB library

async function startServer() {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.db.uri, {
            serverSelectionTimeoutMS: 5000, // Set a timeout for DB connection
        });

        console.log("Connected to the database!");

        // Start the server on the specified port
        const PORT = config.app.port || 3000; // Use the port from config, default to 3000
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Cannot connect to the database!", error);
        process.exit(); // Exit the process if DB connection fails
    }
}

startServer(); // Call the function to start the server
