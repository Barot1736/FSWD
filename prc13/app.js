const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    // Render the form with empty initial values and no errors
    res.render('form', { 
        error: null, 
        values: { income1: '', income2: '' } 
    });
});

app.get('/history', (req, res) => {
    // Render the history page
    res.render('history');
});

app.post('/calculate', (req, res) => {
    const income1 = parseFloat(req.body.income1);
    const income2 = parseFloat(req.body.income2);

    if (
        isNaN(income1) || isNaN(income2) ||
        income1 < 0 || income2 < 0
    ) {
        return res.render('form', {
            error: 'Please enter valid non-negative numbers for both income sources.',
            values: { income1: req.body.income1, income2: req.body.income2 }
        });
    }

    const total = income1 + income2;
    res.render('result', { income1, income2, total });
});

module.exports = app;