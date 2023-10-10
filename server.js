const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
//const  serverless=  require('serverless-http');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (e.g., HTML, CSS, and client-side JavaScript)
app.use(express.static(__dirname));

const corsOptions = {
    origin: "https://graceful-florentine-3aaca2.netlify.app", // Replace with your client's domain
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));



// Handle form submission
app.post("/", async(req, res) => {
 const { name, email, message } = req.body;

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "Gmail", // e.g., "Gmail"
        auth: {
            user: "yhoshoa144@gmail.com",
            pass: "nzvfncwtwkfbosku"
        },
        tls: {
        rejectUnauthorized: false, // Ignore SSL certificate errors
    },
    });

    
    const mailOptions = {
        from: email,
        to: "yhoshoa144@gmail.com",
        subject: `new mail fropm protfolio `,
        text: `Name: ${name}\n Email: ${email}\n Message: ${message} `,
    };

    // Send email
    await  transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error:", error);
            res.status(500).json({ success: false });
        } else {
            console.log("Email sent:", info.response);
            res.json({ success: true });
        }
    });
});
//app.use('.netlify/server',app)
//export const handler = serverless(app);
// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
