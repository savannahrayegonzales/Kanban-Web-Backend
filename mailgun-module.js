
// Import Declaration Block
const FS       = require("fs");
var mailgun    = null;

// Defines the API information for mailgun by reading it from the api_info file
FS.readFile("api_info", "utf8", (error, data) => {
    // If reading the file creates an error, it halts the importation of mailgun
    if(error) throw error;

    else {
        // Declaration of API variables
        var     API_DATA = JSON.parse(data);
        const   API_KEY  = API_DATA.apiKey,
                DOMAIN   = API_DATA.domain;

        // This is where mailgun is brought into the project
        mailgun  = require("mailgun-js")({apiKey: API_KEY, domain: DOMAIN});
    }
});


/**
 * This function makes it easy to send mail using mailgun
 * @param {Object} data send in an object in the below format
 * {
 *  from: 'Excited User <me@samples.mailgun.org>',
 *  to: 'bar@Example.com, YOU@YOUR_DOMAIN_NAME',
 *  subject: 'Hello',
 *  text: 'Testing some Mailgun awesomness!'
 *  }
 */
function sendMail(data) {
    // If mailgun has been properly imported, this function will send emails
    if(mailgun) {
        console.log("[+] Mailgun has been properly imported and is going to send the mail");
        // Here is mailgun actually sending the message
        mailgun.messages().send(data, (err, body) =>{
            if(err) console.log(err);
            else console.log("[+] Now sending mail");
            console.log(`[...] Here is the response\n${JSON.stringify(body)}`);
        });
    }
    // If not, it will report so, but won't throw any errors
    else console.log("[:(] Mailgun had an issue importing and cannot send the email");

}


// Exports declaration block
module.exports.sendMail = sendMail;
