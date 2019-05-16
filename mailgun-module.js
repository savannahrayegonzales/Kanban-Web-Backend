const FS       = require("fs");
var mailgun    = null;
FS.readFile("api_info", "utf8", (error, data) => {
    if(error) throw error;
    else {
        var     API_DATA = JSON.parse(data);
        const   API_KEY  = API_DATA.apiKey,
                DOMAIN   = API_DATA.domain;
        mailgun  = require("mailgun-js")({apiKey: API_KEY, domain: DOMAIN});
    }
});


function sendMail(data) {
    console.log("now sending mail");
    if(mailgun) {
        console.log(mailgun)
        console.log("mailgun exists and should sen the mail");
        mailgun.messages().send(data, (err, body) =>{
            console.log(err);
            console.log(data, 'data')
            console.log(body, 'body');
        });
    }
    else {
        console.log(":(");
    }
}

module.exports.sendMail = sendMail;


