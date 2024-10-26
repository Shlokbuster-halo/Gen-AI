const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const upload = multer({ dest: 'uploads/' });
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.error('No file uploaded.');
    return res.status(400).json({ error: 'No file uploaded' });
  }

  console.log(`File uploaded: ${req.file.originalname}`);

  // Execute the Python script after the file is uploaded
  exec('"C:\\Program Files\\Python312\\python.exe" "main.py"', (error, stdout, stderr) => {
    if (error) {
      console.error(`Exec error: ${error}`);
      return res.status(500).json({ error: 'Failed to process file' });
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }
    console.log(`Stdout: ${stdout}`);
    res.json({ message: 'File uploaded and processed successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
