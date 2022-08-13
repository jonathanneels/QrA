const https = require('https');
//const http = require('http');
 const fs = require('fs');
 
const options = {
  key: fs.readFileSync('testkey.pem'),
  cert: fs.readFileSync('test.crt')//cert.pem
};

 var port = 4444;
 var ip= "127.0.0.1";
 
 
 require('dns').lookup(require('os').hostname(), function (err, add, fam) {
 // console.log('addr: '+add);
  ip = add; // if netwerk allows it - Windows  Firewall - https://stackoverflow.com/questions/5489956/how-could-others-on-a-local-network-access-my-nodejs-app-while-its-running-on/5490033
 	console.log("HTTPS server started at https://"+ip+":" + port.toString());
	
	launchServer();
	
});

function launchServer(){
https.createServer(options, function (req, res) { 

var feedbackUrl = req.url;
   if (feedbackUrl.trim() === '/') { 
        res.writeHead(200, {'Content-Type': 'text/html'});
                          fs.createReadStream('iframe.html').pipe(res);//  fs.createReadStream('default_arjs_test.html').pipe(res); 
    }
else  if	(feedbackUrl.trim().startsWith('/iframe')  )   {
	   res.writeHead(200, {'Content-Type': 'text/html'});
              fs.createReadStream('iframe.html').pipe(res)
	}
	else if	(feedbackUrl.trim().startsWith('/qramaker') ) {
 	fs.readFile(__dirname + "/static/QrA_Maker/index.html", function (err,data) {     
    res.writeHead(200);
    res.end(data);
  }); 
	}
  else{  
  fs.readFile(__dirname + feedbackUrl, function (err,data) {//REF:https://stackoverflow.com/questions/16333790/node-js-quick-file-server-static-files-over-http
    if (err) {
     // res.writeHead(404);
   //   res.end(JSON.stringify(err));
   //   return;
	      res.writeHead(404);
    res.end("Nothing to be found here...");

    }
    res.writeHead(200);
    res.end(data);
  });
  
  }
  
}).listen(port,"0.0.0.0");

 


}
