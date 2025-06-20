// const xlsx = require('xlsx');
// const mongoose = require('mongoose');
// const OrderModel = require('./models/order-model');
// // require('dotenv').config();
// const dotenv = require("dotenv");
// dotenv.config();
// // Connect to MongoDB
// console.log(process.env.MONGO_URI,"process.env.MONGO_URI")
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => {
//   console.error('MongoDB connection error:', err);
//   process.exit(1);
// });

// // Load Excel Workbook
// const workbook = xlsx.readFile('./lib/data.xlsx');
// const sheetName = 'Project 2 Data Sheet';
// const sheet = workbook.Sheets[sheetName];

// if (!sheet) {
//   console.error(`Sheet "${sheetName}" not found.`);
//   process.exit(1);
// }

// const rawData = xlsx.utils.sheet_to_json(sheet);

// if (rawData.length === 0) {
//   console.log(`Sheet "${sheetName}" is empty.`);
//   process.exit(0);
// }
// function parseDate(value) {
//     if (typeof value === 'number') {
//       // It's an Excel date serial number
//       const dateObj = xlsx.SSF.parse_date_code(value);
//       return new Date(dateObj.y, dateObj.m - 1, dateObj.d); // month is 0-based
//     }
  
//     if (typeof value === 'string') {
//       const [day, month, year] = value.split('/');
//       const fullYear = year.length === 2
//         ? (parseInt(year, 10) < 50 ? '20' + year : '19' + year)
//         : year;
//       return new Date(`${fullYear}-${month}-${day}`);
//     }
  
//     return null; // Fallback if format unrecognized
//   }
  

// // Transform data
// const transformedData = rawData.map(row => ({
//   orderDate: parseDate(row['Order Date']),
//   region: row['Region'],
//   salesperson: row['Salesperson'],
//   product: row['Product'],
//   unitsSold: row['Units Sold'],
//   unitPrice: row['Unit Price'],
//   orderValue: row['Order Value'],
// }));

// // Insert into MongoDB
// OrderModel.insertMany(transformedData)
//   .then(() => {
//     console.log(`Successfully imported ${transformedData.length} customers from "${sheetName}".`);
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error('Error saving data:', err);
//     process.exit(1);
//   });
