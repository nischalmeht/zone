const cron = require("node-cron");
const sendEmail=require("../utils/MailTemplate")
const customerModel=require("../models/customer-model")
const endedAuctionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const now = new Date();
    console.log("Cron for ended auction running...");
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const filteredCustomers = await db.customerModel.find({
        totalOrderValue: { $gt: 100000 },
        lastOrderDate: { $lt: sixtyDaysAgo }
    }).toArray();
    for (const auction of filteredCustomers) {
      try {
      

        
        
      } catch (error) {
        return next(console.error(error || "Some error in ended auction cron"));
      }
    }
  })
}

module.exports = endedAuctionCron