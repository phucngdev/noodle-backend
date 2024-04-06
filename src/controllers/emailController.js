const nodemailer = require("nodemailer");

module.exports.sendEmail = async (req, res) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "freelancerit.dev@gmail.com",
      pass: "hfxl woet rfzc nlsw",
    },
  });

  const info = await transporter.sendMail({
    from: '"Phucdeptrai" <freelancerit.dev@gmail.com>',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world</b>",
  });
  return info;
};
