import express from 'express';

const app = express();

app.get('/api/users', (req, res) => {
    res.send('Hello World it\'s me, Mariooooo!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});