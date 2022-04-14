require('dotenv').config();
const sgMail = require('@sendgrid/mail');

//sgMail.setApiKey(apiKey)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (medicine) => {
    console.log(`Medicine from email : ${medicine}`)
    sgMail.send({
        to: 'ronewagilbert3@gmail.com',
        from: 'ronewamavhungu@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, Ronewa. Let me know how you get along with the app.`
    })
};

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ronewamavhungu@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}