const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3003;

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'resume-' + uniqueSuffix + '.pdf');
    }
});

// File filter to allow only PDF files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

// Configure multer with size limit (2MB) and file filter
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB in bytes
    },
    fileFilter: fileFilter
});

// Routes
app.get('/', (req, res) => {
    res.render('index', { message: null, error: null });
});

app.post('/upload-resume', (req, res) => {
    upload.single('resume')(req, res, (err) => {
        if (err) {
            let errorMessage = 'Upload failed!';
            
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    errorMessage = 'File too large! Please upload a PDF file smaller than 2MB.';
                } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    errorMessage = 'Unexpected field name. Please use the correct form.';
                }
            } else if (err.message === 'Only PDF files are allowed!') {
                errorMessage = 'Invalid file type! Please upload only PDF files.';
            }
            
            return res.render('index', { 
                message: null, 
                error: errorMessage 
            });
        }
        
        if (!req.file) {
            return res.render('index', { 
                message: null, 
                error: 'Please select a PDF file to upload.' 
            });
        }
        
        const { name, email, position } = req.body;
        
        // Validate required fields
        if (!name || !email || !position) {
            // Delete uploaded file if validation fails
            fs.unlinkSync(req.file.path);
            return res.render('index', { 
                message: null, 
                error: 'Please fill in all required fields.' 
            });
        }
        
        const successMessage = `Resume uploaded successfully! 
                               Name: ${name}, 
                               Email: ${email}, 
                               Position: ${position}, 
                               File: ${req.file.filename}`;
        
        res.render('index', { 
            message: successMessage, 
            error: null 
        });
    });
});

// Route to list uploaded resumes
app.get('/resumes', (req, res) => {
    fs.readdir('uploads/', (err, files) => {
        if (err) {
            return res.render('resumes', { files: [], error: 'Unable to load resumes.' });
        }
        
        const pdfFiles = files.filter(file => file.endsWith('.pdf'));
        res.render('resumes', { files: pdfFiles, error: null });
    });
});

// Route to download resume
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, 'uploads', filename);
    
    if (fs.existsSync(filepath)) {
        res.download(filepath);
    } else {
        res.status(404).send('File not found');
    }
});

app.listen(PORT, () => {
    console.log(`Job Portal running on http://localhost:${PORT}`);
    console.log('Upload your resume and apply for jobs!');
});