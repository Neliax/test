const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
