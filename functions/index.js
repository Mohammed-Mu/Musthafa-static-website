const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configure the email transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'musthafaam246@gmail.com',
        pass: 'ljxy bqqu ttqe mnhu'
    }
});

exports.sendEmailNotification = functions.database.ref('/messages/{messageId}')
    .onCreate(async (snapshot, context) => {
        const message = snapshot.val();

        // Email content
        const mailOptions = {
            from: '"Portfolio Contact Form" <musthafaam246@gmail.com>',
            to: 'musthafaam246@gmail.com',
            subject: `New Contact Form Message from ${message.name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${message.name}</p>
                <p><strong>Email:</strong> ${message.email}</p>
                <p><strong>Message:</strong> ${message.message}</p>
                <p><strong>Time:</strong> ${new Date(message.timestamp).toString()}</p>
            `
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.response);
            return {success: true};
        } catch(error) {
            console.error('Error sending email:', error);
            return {error: error.message};
        }
    });
