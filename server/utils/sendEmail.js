const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    try{
        if(!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return new Error("Please provide email and password");
    }
    const transporter = nodeMailer.createTransport({
        service : 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: `<p>${options.text}</p>`,
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    }
    catch(error){
        console.log('Error in sending email', error.message);
    }
}