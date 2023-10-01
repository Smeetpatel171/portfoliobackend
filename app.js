const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const router = new express.Router();
require('dotenv').config();


const emailUsername = process.env.EMAIL_USERNAME;
const emailPassword = process.env.EMAIL_PASSWORD;

const app = express();
const port = process.env.PORT || 8006;

router.post("/register", (req, res) => {
  const { name, subject, message,email } =
    req.body;
  console.log(req.body);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUsername,
        pass: emailPassword,
      },
    });

    const mailOptions = { 
      to: "sppatelmaster123@gmail.com",
      subject: "You have a Cient SP",
      html: `<h1>Client/Recruiter Details</h1><h2>Name : ${name}</h2><h2>email : ${email}</h2><h2>Subject : ${subject}</h2><h2>Message : ${message}</h2>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
         // Instead of sending plain text, send a JSON response with an error message.
         res.status(500).json({ error: "An error occurred while sending the email" });
      } else {
        console.log("Email Sent" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  } catch {
    res.status(201).json({ status: 401, error });
  }
});

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`server listen at port no: ${port}`);
});
