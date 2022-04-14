const mongoose = require('mongoose')
const moment = require('moment')
const cfg = require('../../config');
const Twilio = require('twilio');
const {sendWelcomeEmail} = require('../../emails/account')

const medicineSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    dosage:{
        type: 'Number',
        required: [true, 'Must be a numeric value']
    },
    frequency:{
        type: 'Number',
        required: true
    },
    notification:{
        type: 'Number',
        required: [true, 'Mustsn\'t be empty']
    },
    timeZone:{
        type: String
    },
    time: {
        type: Date, 
        index: true
    }

});

medicineSchema.methods.requiresNotification = function(date) {
    return Math.round(moment.duration(moment(this.time).tz(this.timeZone).utc()
        .diff(moment(date).utc())
        ).asMinutes()) === this.notification;
};
  
medicineSchema.statics.sendNotifications = function(callback) {
    // now
    //console.log('Mavhungu Ronewa G')
    const searchDate = new Date();
    Medicine
      .find()
      .then(function(medicines) {
        medicines = medicines.filter(function(medicine) {
            return medicine.requiresNotification(searchDate);
        });
        if (medicines.length > 0) {
          sendNotifications(medicines);
          sendWelcomeEmail(medicines);
        }
      });
    }
    /**
    * Send messages to all medicine owners via Twilio
    * @param {array} medicines List of appointments.
    */
    function sendNotifications(medicines) {
        const client = new Twilio(cfg.twilioAccountSid, cfg.twilioAuthToken);
        //console.log('Mavhungu RGB')
        medicines.forEach(function(medicine) {
            // Create options to send the message
            //console.log('Ronewa Mavhungu')
            const options = {
                to: `+27786671901`,
                from: cfg.twilioPhoneNumber,
                /* eslint-disable max-len */
                body: `Hi Ronewa. Just a reminder that you have an appointment coming up.`,
                /* eslint-enable max-len */
            };

            // Send the message!
            client.messages.create(options, function(err, response) {
                if (err) {
                    // Just log it for now
                    console.error(err);
                } else {
                    // Log the last few digits of a phone number
                    let masked = medicine.phoneNumber.substr(0, medicine.phoneNumber.length - 5);
                    masked += '*****';
                    console.log(`Message sent to ${masked}`);
                }
            });
        });

        // Don't wait on success/failure, just indicate all messages have been
        // queued for delivery
       /* if (callback) {
            callback.call();
        }*/
    }

    const Medicine = mongoose.model('medicine',medicineSchema);

module.exports = Medicine;