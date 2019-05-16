//// Module import block
const restify       = require("restify"),
      mongo         = require("mongodb"),
      mailgun       = require("./mailgun-module"),
      dataValidator = require("./data-validator");
      port          = process.env.PORT || 3000;

//// Server creation section
var server = restify.createServer({
    name: "Simple restify server"
});

//// Server middleware section
// This logs the request method and where they are sending their requests to
server.use((request, response, next) =>{
    console.log(`${request.method} ${request.url}`);
    return next();
});

// This allows for cross origin responses, we ran into an issue where firefox 
// would not read what the server was sending back and by adding these headers
// firefox will accept it
server.use(function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
});

// Allows for easier parsing of AJAX POST bodies
server.use(restify.plugins.bodyParser());

// Starts the server on port
server.listen(port, function() {
    console.log(`[+] API running @ port ${port}`);
})


/// API Methods
// On a standard GET on the root directory, the word "hi" will be returned
server.get('/', (request, result, next) =>{
    result.send(200,"hi");
    console.log(request.body);
    next();
});

/**
 * On a POST command to /api/send_email the body must contain:
 * @param target  a properly validated email address
 * @param subject a subject for the email
 * @param text    content for the email
 */
server.post('/api/send_email', (request, result, next) =>{
    data         = {};
    data.from    = `Excited User <sampleEmail@inventive-internship.com>`;
    if('target' in request.body && dataValidator.checkEmail(request.body.target)) data.to = request.body.target;
    else {
        result.end("Email Not Sent! please check your data and try again");
        return;
    }
    if('subject' in request.body) data.subject = request.body.subject;
    else {
        result.end("Email Not Sent! please check your data and try again");
        return;
    }
    if('text' in request.body) data.text = request.body.text;
    else {
        result.end("Email Not Sent! please check your data and try again");
        return;
    }
    mailgun.sendMail(data);
    result.end("Email Sent!");
    next();
});