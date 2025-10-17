const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3005;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

// Gmail configuration - REPLACE WITH YOUR CREDENTIALS
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'd24dcs166@charusat.edu.in',    // Replace with your Gmail
        pass: 'frqv zxlo ezof bxwx'        // Replace with Gmail App Password
    }
});

app.get('/', (req, res) => {
    res.render('portfolio', { message: null, error: null });
});

app.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Validation
    if (!name || !email || !subject || !message) {
        return res.render('portfolio', { 
            message: null, 
            error: 'All fields are required!' 
        });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.render('portfolio', { 
            message: null, 
            error: 'Please enter a valid email address!' 
        });
    }
    
    const mailOptions = {
        from: email,
        to: 'barotparth1736@gmail.com',
        subject: `Portfolio Contact: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    };
    
    try {
        await transporter.sendMail(mailOptions);
        res.render('portfolio', { 
            message: 'Message sent successfully! I will get back to you soon.', 
            error: null 
        });
    } catch (error) {
        console.error('Email error:', error);
        res.render('portfolio', { 
            message: null, 
            error: 'Failed to send message. Please try again later.' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Portfolio running on http://localhost:${PORT}`);
});