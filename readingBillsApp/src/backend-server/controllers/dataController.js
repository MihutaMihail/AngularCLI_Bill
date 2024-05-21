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
      return res.status(500).send("Data not found");
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
  const id = req.params.id;
  const field = req.params.field;
  const body = req.body;
  const filePath = path.join(dataDirectory, `${id}.json`);

  if (!field || body === undefined) {
    return res.status(400).send("Field and value are required");
  }

  // Read existing data
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(404).send("Data by ID not found");
    }

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).send("Error parsing JSON data");
    }

    // Update specified field
    if (jsonData.fieldValues) {
      jsonData.fieldValues[field] = body.newValue;
    }

    // Write updated data back to origin file
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).send("Error saving updated data");
      }
    });

    res.status(200).json({ message: "Data updated successfully" });
  });
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
