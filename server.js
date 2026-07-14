require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    family: 4, // примусово використовувати IPv4
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log("SMTP ERROR:", error);
    } else {
        console.log("SMTP ready");
    }
});

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/api/test", (req, res) => {
    res.json({
        message: "Сервер працює!"
    });
});


app.post("/api/contact", async (req, res) => {

    const { name, phone, message } = req.body;

    try {

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_TO,

            subject: "Нова заявка з сайту Панські меблі",

            html: `

                <h2>Нова заявка</h2>

                <p><strong>Ім'я:</strong> ${name}</p>

                <p><strong>Телефон:</strong> ${phone}</p>

                <p><strong>Повідомлення:</strong></p>

                <p>${message}</p>

            `

        });

        res.json({

            success: true

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success: false

        });

    }

});


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});