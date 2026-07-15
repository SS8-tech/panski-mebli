const dns = require("node:dns");
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();
const PORT = process.env.PORT || 3000;




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

        console.log("before sendmail");

const { data, error } = await resend.emails.send({
    from: "Панські меблі <onboarding@resend.dev>",
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

if (error) {
    console.error(error);
    throw error;
}

console.log(data);

        console.log("after sendmail");

        res.json({

            success: true

        });

    }

    catch(error){

        console.log("SEND ERROR:", error);

        res.status(500).json({

            success: false

        });

    }

});


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});