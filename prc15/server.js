const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3004;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: 'library-portal-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Routes
app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/profile');
    } else {
        res.render('login', { error: null });
    }
});

app.post('/login', (req, res) => {
    const { name } = req.body;
    
    if (!name || name.trim() === '') {
        return res.render('login', { error: 'Please enter your name' });
    }
    
    // Create session
    req.session.user = {
        name: name.trim(),
        loginTime: new Date().toLocaleString()
    };
    
    res.redirect('/profile');
});

app.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    res.render('profile', { user: req.session.user });
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
        }
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Library Portal running on http://localhost:${PORT}`);
});