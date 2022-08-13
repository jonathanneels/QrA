var cluster = require('cluster');

const http = require('http');
 const fs = require('fs');
var os = require( 'os' );
const path = require('path');

const { parse } = require('querystring');
 
 
const directoryPath = path.join(__dirname, 'static');

 var port = process.env.PORT || 8010;;//REF:https://help.heroku.com/P1AVPANS/why-is-my-node-js-app-crashing-with-an-r10-error
  
	if(cluster.isMaster) {//REF: https://www.sitepoint.com/how-to-create-a-node-js-cluster-for-speeding-up-your-apps/ & https://stackoverflow.com/questions/5999373/how-do-i-prevent-node-js-from-crashing-try-catch-doesnt-work
    var numWorkers =process.env.WEB_CONCURRENCY || 1;// require('os').cpus().length; https://stackoverflow.com/questions/28616813/how-to-properly-scale-nodejs-app-on-heroku-using-clusters

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
	
	
} else {
	launchServer();}
	
	process
  .on('unhandledRejection', (reason, p) => {//https://shapeshed.com/uncaught-exceptions-in-node/ & https://stackoverflow.com/questions/40867345/catch-all-uncaughtexception-for-node-js-app
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });
  
	 

 

function launchServer(){
const server = http.createServer((req, res) => {

	req.url = req.url.replace(/(.*?) ?fbclid.*/i, "$1").trim(); // handling fb click id
					if(req.url.slice(-1) =="?"){
			req.url =req.url.substring(0, req.url.length - 1).trim();
			}
			
 

var feedbackUrl = req.url;
  if (feedbackUrl.trim() === '/') { 
        res.writeHead(200, {'Content-Type': 'text/html'});
                     fs.createReadStream('iframe.html').pipe(res);//       fs.createReadStream('default_arjs_test.html').pipe(res); 
    }
else  if	(feedbackUrl.trim().startsWith('/iframe')  ) {
	   res.writeHead(200, {'Content-Type': 'text/html'});
              fs.createReadStream('iframe.html').pipe(res)
	}
	else  if	(feedbackUrl.trim().startsWith('/vrframe')  )   {
	   res.writeHead(200, {'Content-Type': 'text/html'});
              fs.createReadStream('VRiframe.html').pipe(res)
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
  
}).listen(port, () => {
    console.log("Our app is running on port ${ PORT }. (Default = 8010)");
});}