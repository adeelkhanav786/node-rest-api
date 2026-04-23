const express = require('express');
const app = express();

app.use(express.json()); // Middleware to read JSON

// Dummy data
let users = [
    { id: 1, name: "Adeel" },
    { id: 2, name: "Ali" }
];

// GET - Fetch all users
app.get('/users', (req, res) => {
    res.json(users);
});

// POST - Add new user
app.post('/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(user);
    res.json(user);
});

// PUT - Update user
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (user) {
        user.name = req.body.name;
        res.json(user);
    } else {
        res.status(404).send("User not found");
    }
});

// DELETE - Delete user
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(u => u.id !== id);
    res.send("User deleted");
});

// Server start
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});