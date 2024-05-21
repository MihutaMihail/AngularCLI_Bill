const path = require('path');
const fs = require('fs');

// Define data folder for storing JSON files
const dataDirectory = path.join(__dirname, '../data');
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory);
}

// Retrieve all data
const getAllData = (req, res) => {
  fs.readdir(dataDirectory, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading data directory");
    }

    const jsonFiles = files.filter((file) => file.endsWith(".json"));
    const data = jsonFiles.map((file) => {
      const content = fs.readFileSync(path.join(dataDirectory, file));
      return JSON.parse(content);
    });

    res.status(200).json(data);
  });
};

// Retrive data by ID
const getDataById = (req, res) => {
  const id = req.params.id;
  const filePath = path.join(dataDirectory, `${id}.json`);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(404).send("Data by ID not found");
    }

    res.status(200).json(JSON.parse(data));
  });
};

// Update data field by ID
const updateDataFieldById = (req, res) => {
  
};

// Delete data by ID
const deleteDataById = (req, res) => {
  const id = req.params.id;
  const filePath = path.join(dataDirectory, `${id}.json`);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).send("Data not found");
    }

    res.status(200).json({ message: "Data deleted successfully" });
  });
};

// CAN'T BE CALLED THROUGH POSTMAN (secret key required)
// Save extracted data coming from Angular
const saveData = (req, res) => {
  const { data, id } = req.body;
  if (!data || !id) {
    return res.status(400).send('Data and id are required');
  }
  
  const filePath = path.join(dataDirectory, `${id}.json`);
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error saving data');
    }
    res.status(200).json({ message: 'Data saved successfully' });
  });
};

// Export modules
module.exports = {
  getAllData,
  getDataById,
  updateDataFieldById,
  deleteDataById,
  saveData
};
