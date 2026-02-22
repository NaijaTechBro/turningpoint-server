const Mailjet = require('node-mailjet');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const Settings = require('../models/Settings');

// --- Helper function to render Handlebars templates ---
const renderTemplate = (templateName, data) => {
    const filePath = path.join(__dirname, `../emails/${templateName}.handlebars`);
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const dataWithYear = { ...data, currentYear: new Date().getFullYear() };
    return template(dataWithYear);
};

// --- Mailjet (API-based) ---
const sendEmailWithMailjet = async (options) => {
    const mailjet = Mailjet.apiConnect(
        process.env.MAILJET_API_KEY,
        process.env.MAILJET_SECRET_KEY
    );

    const htmlContent = renderTemplate(options.template, {
        name: options.name,
        link: options.link,
    });
    
    // Extract sender details from the options.sent_from string
    const senderMatch = options.sent_from.match(/<(.*)>/);
    const senderEmail = senderMatch ? senderMatch[1] : process.env.MAILJET_SENDER_EMAIL;
    const senderName = options.sent_from.replace(/ <.*>/, '') || process.env.MAILJET_SENDER_NAME;

    console.log("📧 Sending email via Mailjet to:", options.send_to);

    await mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: senderEmail,
                        Name: senderName,
                    },
                    To: [
                        {
                            Email: options.send_to,
                            Name: options.name, 
                        },
                    ],
                    Subject: options.subject,
                    HTMLPart: htmlContent,
                    Headers: {
                        'Reply-To': options.reply_to.match(/<(.*)>/) ? options.reply_to.match(/<(.*)>/)[1] : options.reply_to,
                    }
                },
            ],
        });
};

// --- Service 2: Nodemailer  ---
const sendEmailWithNodemailer = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SELEKTIONAI_EMAIL_HOST,
        port: process.env.SELEKTIONAI_EMAIL_PORT,
        secure: true, 
        auth: {
            user: process.env.SELEKTIONAI_EMAIL_USER,
            pass: process.env.SELEKTIONAI_EMAIL_PASS,
        },
    });

    const htmlContent = renderTemplate(options.template, {
        name: options.name,
        link: options.link,
    });

    console.log("📧 Sending email via Nodemailer SMTP to:", options.send_to);
    await transporter.sendMail({
        from: options.sent_from,
        to: options.send_to,
        replyTo: options.reply_to,
        subject: options.subject,
        html: htmlContent,
        attachments: options.attachments || [],
    });
};

// --- Main Exported Function ---
const sendEmail = async (options) => {
    // Fetch the current settings from the database
    const currentSettings = await Settings.findOne({ singleton: 'main_settings' });

    // Use the database setting to decide which service to use
    const provider = currentSettings?.emailProvider || 'mailjet'; // Updated default

    if (provider === 'mailjet') { 
        return sendEmailWithMailjet(options);
    } else {
        return sendEmailWithNodemailer(options);
    }
};

module.exports = { sendEmail };