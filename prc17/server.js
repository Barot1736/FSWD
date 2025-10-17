const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3006;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/tuition', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Student schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    class: { type: String, required: true },
    subject: { type: String, required: true },
    fees: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

// Routes
app.get('/', async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.render('index', { students, message: null, error: null });
    } catch (error) {
        res.render('index', { students: [], message: null, error: 'Failed to load students' });
    }
});

app.post('/add', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.redirect('/?message=Student added successfully');
    } catch (error) {
        res.redirect('/?error=Failed to add student');
    }
});

app.get('/edit/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.render('edit', { student, error: null });
    } catch (error) {
        res.redirect('/?error=Student not found');
    }
});

app.post('/update/:id', async (req, res) => {
    try {
        await Student.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/?message=Student updated successfully');
    } catch (error) {
        res.redirect('/?error=Failed to update student');
    }
});

app.post('/delete/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.redirect('/?message=Student deleted successfully');
    } catch (error) {
        res.redirect('/?error=Failed to delete student');
    }
});

app.listen(PORT, () => {
    console.log(`Tuition Admin Panel running on http://localhost:${PORT}`);
});