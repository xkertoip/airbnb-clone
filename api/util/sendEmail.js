const nodemailer = require('nodemailer');

module.exports.sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            post: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.PASS
            }
        });

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: subject,
            text: text
        });
        console.log("email sent successfully")
    } catch ( error ) {
        console.log('email not sent');
        console.log(error)
    }

}
