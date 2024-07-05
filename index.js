const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Define the folder where the text files will be stored
const folderPath = path.join(__dirname, 'text-files');

// Create the folder if it doesn't exist
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// API endpoint to create a text file
app.post('/create-file', (req, res) => {
  const currentDate = new Date();
  const fileName = `${currentDate.toString().replace(/:/g, '-')}.txt`;
  const filePath = path.join(folderPath, fileName);

  // Write the current date and time to the file
  fs.writeFileSync(filePath, currentDate.toString());

  res.status(201).json({ message: 'Text file created successfully', fileName });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});