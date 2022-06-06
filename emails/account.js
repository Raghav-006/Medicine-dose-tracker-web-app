require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
   const message = {
      "from": {
         "email": "ronewamavhungu@gmail.com"
      },
      "personalizations": [{
         "to": [{
            "email": email
         }],
         "dynamic_template_data": {
            "Subject": 'Thanks for joining in!',
            "customername": name,
         }
      }],
      "template_id": process.env.TEMPLATE_ID,
   }
   sgMail.send(message)
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

/*console.log(`Medicine from email : ${medicine}`); text: `Welcome to the app, Ronewa. Let me know how you get along with the app.`,*/