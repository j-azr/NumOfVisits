const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
    let visits = req.cookies.visits ? parseInt(req.cookies.visits, 10) : 0;
    let lastVisit = req.cookies.lastVisit ? new Date(req.cookies.lastVisit) : null;
    let currentVisit = new Date();

    visits += 1;

    res.cookie('visits', visits, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
    res.cookie('lastVisit', currentVisit.toISOString(), { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year

    if (visits === 1) {
        res.send('Welcome to my webpage! It is your first time that you are here.');
    } else {
        const lastVisitFormatted = lastVisit ? lastVisit.toString() : 'unknown time';
        res.send(`Hello, this is the ${visits} time that you are visiting my webpage.<br>Last time you visited my webpage on: ${lastVisitFormatted}`);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
