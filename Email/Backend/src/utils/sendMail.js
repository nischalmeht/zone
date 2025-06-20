const nodeMailer = require("nodemailer");
const { Mail } = require("./MailTemplate");

const replacePlaceholders = (template, data) => {
  return template.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || "");
};

const sendEmail = async ({ email, companyName, customerName, offer, shopNowLink, yourName, year }) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const htmlContent = replacePlaceholders(Mail, {
    companyName,
    customerName,
    offer,
    shopNowLink,
    yourName,
    year,
  });

  const options = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "We Miss You at " + companyName,
    html: htmlContent,
  };

  await transporter.sendMail(options);
};

module.exports = sendEmail;
