const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const emailOptions = {
    from: "TodoApp support <support@todoapp.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  // try {
  //   const info = await transporter.sendMail(emailOptions);
  //   console.log("Email sent: " + info.response);
  // } catch (error) {
  //   console.error("Error sending email: ", error);
  //   throw error; // Para que o erro seja capturado na função principal
  // }

  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
