const xlsx = require('xlsx');
const mongoose = require('mongoose');
const Customer = require('./models/customer-model');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-db-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Load Excel Workbook
const workbook = xlsx.readFile('./lib/data.xlsx');
const sheetName = 'Project 3 Data Sheet';
const sheet = workbook.Sheets[sheetName];

if (!sheet) {
  console.error(`Sheet "${sheetName}" not found.`);
  process.exit(1);
}

const rawData = xlsx.utils.sheet_to_json(sheet);

if (rawData.length === 0) {
  console.log(`Sheet "${sheetName}" is empty.`);
  process.exit(0);
}
function parseDate(value) {
    if (typeof value === 'number') {
      // It's an Excel date serial number
      const dateObj = xlsx.SSF.parse_date_code(value);
      return new Date(dateObj.y, dateObj.m - 1, dateObj.d); // month is 0-based
    }
  
    if (typeof value === 'string') {
      const [day, month, year] = value.split('/');
      const fullYear = year.length === 2
        ? (parseInt(year, 10) < 50 ? '20' + year : '19' + year)
        : year;
      return new Date(`${fullYear}-${month}-${day}`);
    }
  
    return null; // Fallback if format unrecognized
  }
  

// Transform data
const transformedData = rawData.map(row => (console.log(row,'row'),{
  name: row['Customer Name'],
  email: row['Email'],
  lastOrderDate: parseDate(row['Last Order Date']),
  totalOrderValue: row['Total Order Value'],
  last3ItemsOrdered: row['Last 3 Items Ordered']
    .split(',')
    .map(item => ({ itemName: item.trim() }))
}));

// Insert into MongoDB
Customer.insertMany(transformedData)
  .then(() => {
    console.log(`Successfully imported ${transformedData.length} customers from "${sheetName}".`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Error saving data:', err);
    process.exit(1);
  });
