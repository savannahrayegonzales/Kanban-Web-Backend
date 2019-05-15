const restify  = require("restify"),
      port     = process.env.PORT || 3000;

var server = restify.createServer({
    name: "Simple restify server"
});


server.use((request, response, next) =>{
    console.log(`${request.method} ${request.url}`);
    return next();
});

server.use(function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  });
server.use(restify.plugins.bodyParser());

server.listen(port, function() {
    console.log(`api running @ port ${port}`);
})

server.get('/', (request, result, next) =>{
    result.send(200,"hi");
    console.log(request.body);
    next();
});

server.post('/', (request, result, next) =>{
    request.headers.origin = request.url;
    result.write("<text>hello");
    result.end(request.body.name + "</text>");
    //result.end();
    next();
});