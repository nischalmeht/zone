const orderModel = require("../models/order-model");

class saleController {
  static sales = async (req, res) => {
    try {
      const totalSales = await orderModel.aggregate([
        {
          $group: {
            _id: null,
            totalSum: { $sum: "$orderValue" }
          }
        }
      ]);

      const Yearwise =await orderModel.aggregate([
        {
          $group: {
            _id: { $year: "$orderDate" },
            totalSales: { $sum: "$orderValue" }
          }
        },
        {
          $project: {
            _id: 0,
            year: "$_id",
            totalSales: 1
          }
        },
        {
          $sort: { year: 1 }
        }
      ])
      const last12MonthSales = await orderModel.aggregate([
        {
          $group: {
            _id: {
              month: { $month: "$orderDate" },
              year: { $year: "$orderDate" },
            },
            totalAmount: { $sum: "$unitsSold" },
          },
        },
        {
          $project: {
            _id: 0,                // remove _id
            year: "$_id.year",     // extract year
            month: "$_id.month",   // extract month
            totalAmount: 1         // include totalAmount
          },
        },
        {
          $sort: { year: 1, month: -1 },
        },
      ]);
      
      const RigeonWise =await orderModel.aggregate([
        {
          $group: {
            _id: "$region", // group by region field
            totalOrderValue: { $sum: "$orderValue" } // sum of orderValue for each region
          }
        },
        {
          $project: {
            _id: 0,
            region: "$_id",
            totalOrderValue: 1
          }
        }
      ]);
                
      const total = {
        totalSales: totalSales[0]?.totalSum || 0,
        Yearwise,
        last12MonthSales,
        RigeonWise
      };

      res.status(200).json(total);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };
  static productWiseSale = async (req, res) => {
    try {
      const productWiseSales = await orderModel.aggregate([
        {
          $group: {
            _id: "$product", // or "$productId" if you're grouping by ID
            totalUnitsSold: { $sum: "$unitsSold" },
            totalSalesAmount: { $sum: "$orderValue" } // if you have a totalAmount field
          }
        },
        {
          $sort: { totalSalesAmount: -1 } // Sort by sales, descending
        }
      ]);
      
   

      res.status(200).json(productWiseSales);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = saleController;
