const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config({ path: path.join(__dirname, '.env') });
const connectDB = require('./Models/db');
const PORT = process.env.PORT || 8080;
const TaskRouter = require('./Routes/TaskRouter');
const cors = require('cors');

app.get('/', (req, res) => {
    res.send('Hello from the server');
});
app.use(cors())
app.use(express.json());
app.use('/tasks', TaskRouter)

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on PORT=${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to start server:', err.message);
        process.exit(1);
    });
