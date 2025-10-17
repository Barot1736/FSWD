const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('calculator', { result: null, error: null });
});

app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;
    
    // Validate inputs
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);
    
    if (isNaN(number1) || isNaN(number2)) {
        return res.render('calculator', { 
            result: null, 
            error: 'Please enter valid numbers only!' 
        });
    }
    
    let result;
    let error = null;
    
    try {
        switch (operation) {
            case 'add':
                result = number1 + number2;
                break;
            case 'subtract':
                result = number1 - number2;
                break;
            case 'multiply':
                result = number1 * number2;
                break;
            case 'divide':
                if (number2 === 0) {
                    error = 'Cannot divide by zero!';
                } else {
                    result = number1 / number2;
                }
                break;
            default:
                error = 'Please select an operation!';
        }
        
        if (result !== undefined) {
            result = Math.round(result * 100) / 100; // Round to 2 decimal places
        }
        
    } catch (err) {
        error = 'Something went wrong!';
    }
    
    res.render('calculator', { result, error });
});

app.listen(PORT, () => {
    console.log(`Kids Calculator running on http://localhost:${PORT}`);
    console.log('Open your browser and go to http://localhost:3000');
});