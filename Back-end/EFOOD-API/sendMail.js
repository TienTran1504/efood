const nodemailer = require('nodemailer');
const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "trandungtien1504@gmail.com",
        pass: "ojsowfdkhtwdhnxo"
    }
})
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const sendMail = (lengthOTP, email) => new Promise(
    (resolve, reject) => {
        let details = {
            from: "trandungtien1504@gmail.com", // sender address
            to: email, // list of receivers
            subject: "OTP", // Subject line
            text: makeid(lengthOTP), // plain text body
        }
        let OTP = null;
        const check = mailTransporter.sendMail(details, (err) => {
            if (err) {
                console.log("It has an error", err);
                reject(err);
            }
            else {
                OTP = details.text;
                console.log("email has sent: ", details.text);
                resolve(OTP);
            }
        })
    }
)


module.exports = sendMail;