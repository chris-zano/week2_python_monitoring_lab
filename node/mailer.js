const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');

const getSystemCredentials = () => {
    return {
        user: process.env.SYSTEM_EMAIL,
        pass: process.env.SYSTEM_EMAIL_PASSWORD
    }
}

const filepath = path.join(__dirname, '..', 'system_alert_email.json');
const recipient_email = 'niico.ncs@gmail.com'
try {

    async function readFileData() {
        try {
            const data = await fs.readFile(filepath, 'utf-8');
            const jsonData = JSON.parse(data);

            const { subject, message } = jsonData;
            const { user, pass } = getSystemCredentials()

            if (!user || !pass) {
                throw new Error('Cannot authenticate. User credentials not available');
            }

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: { user, pass }
            });

            const options = {
                from: user,
                to: recipient_email,
                subject: subject,
                html: `<p>${message}</p>`
            }

            transporter.sendMail(options)
                .then(response => {
                    console.log('Email sent successfully!');
                    console.log(`Response: ${response.response}`);
                })
                .catch(error => {
                    throw new Error(error);
                })
        } catch (err) {
            console.warn('The email could not be delivered.')
            console.error('Error reading the file:', err);
        }
    }

    readFileData();

} catch (error) {
    console.log('an error occured');
    console.error(error)
}
