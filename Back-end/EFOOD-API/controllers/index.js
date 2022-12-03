const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "trandungtien1504@gmail.com",
        pass: "ojsowfdkhtwdhnxo"
    }
})
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

let details = {
    from: "trandungtien1504@gmail.com",
    to: "trandungtien0305@gmail.com",
    subject: "OTP",
    text: makeid(5),
}

mailTransporter.sendMail(details, (err) => {
    if (err) {
        console.log("It has an error", err);
    }
    else {
        console.log("email has sent: ", details.text);
    }
})
