var express = require('express');
var parser = require('ua-parser-js');

var app = express();

app.get('/', function (req, res) {
  var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  var language = req.headers["accept-language"].split(',')[0];
  var software = parser(req.headers['user-agent'])


  console.log(ip);
  console.log(language);
  console.log(software.os.name + " " + software.os.version);
  res.end(JSON.stringify({
    "ipaddress": ip,
     "language": language,
      'software': software.os.name + " " + software.os.version
  }));
})


app.listen(process.env.PORT || 3000);
