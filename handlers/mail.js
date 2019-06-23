const nodemailer = require(`nodemailer`),
    { google } = require(`googleapis`),
    OAuth2 = google.auth.OAuth2;
    

// Configuring Google OAuth Client
const OAuth2Client = new OAuth2(
    process.env.MAIL_CLIENT_ID,
    process.env.MAIL_CLIENT_SECRET,
    `https://developers.google.com/oauthplayground`
);

OAuth2Client.setCredentials({
    refresh_token: process.env.MAIL_REFRESH_TOKEN
});

// Creating access token
const accessToken = OAuth2Client.getAccessToken()
        .then((res => {
            return res.token;
        }))
        .catch((err) => {
            console.log(`fuck this. ${err}`);
        });


const transport = nodemailer.createTransport({
    service: `gmail`,
    auth: {
        type: `OAuth2`,
        user: process.env.MAIL_USER,
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        refreshToken: process.env.MAIL_REFRESH_TOKEN,
        accessToken: accessToken
    },
    tls: {
        rejectUnauthorized: false
    }
});


const sendMail = function(receiver, subject, message){
    return transport.sendMail({
        from: `Anarchy Futurism <${process.env.MAIL_USER}>`,
        to: receiver,
        subject: subject,
        text: `Plain text msg = ${message}`,
        html: `<h1>HTML text msg = ${message}</h1>`
    });
};

module.exports = sendMail;