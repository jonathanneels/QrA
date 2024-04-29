var cluster = require('cluster');

const http = require('http');
 const fs = require('fs');
var os = require( 'os' );
const path = require('path');
 var mime = require('mime');

const { parse } = require('querystring');
 
 
const directoryPath = path.join(__dirname, 'static');

 var port = process.env.PORT || 8010;//REF:https://help.heroku.com/P1AVPANS/why-is-my-node-js-app-crashing-with-an-r10-error
  
   var memoNote = {user:"",text:"",date:dateTimeNow()};
 var memoList=[];

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
  
	 
function dateTimeNow() 
{
	
	let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
 let minutes = date_ob.getMinutes();
 let seconds = date_ob.getSeconds();

 return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

}
 function dateTimeDay() 
{
	
	let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
 let minutes = date_ob.getMinutes();
 let seconds = date_ob.getSeconds();

if(month.toString().length ==1)
{ 
	month="0"+month.toString();
}
if(date.toString().length ==1)
{ 
	date="0"+date.toString();
}
 return(year.toString() +  month.toString() + date.toString()  );

}
function getStream(stream) {
  return new Promise(resolve => {
    const chunks = [];

     stream.on("data", chunk => chunks.push(Buffer.from(chunk)));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString()));
  });
}

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

function launchServer(){
	
	  fs.open(__dirname+'\\static\\Augme\\storedMindFiles\\customNames_linker.txt','r',function(err, fd){
    if (err) {
      fs.writeFile(__dirname+'\\static\\Augme\\storedMindFiles\\customNames_linker.txt', '', function(err) {
          if(err) {
              console.log(err);
          }
          console.log("customNames_linker.txt file was created!");
      });
    } 
  });

const server = http.createServer((req, res) => {

	req.url = req.url.replace(/(.*?) ?fbclid.*/i, "$1").trim(); // handling fb click id
					if(req.url.slice(-1) =="?"){
			req.url =req.url.substring(0, req.url.length - 1).trim();
			}
			
 

var feedbackUrl = req.url;

		  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");

 if (req.method == 'POST') {
		console.log(req.url);
		
		if(req.url.trim()== '/api/createDirectory') { 
			try{
			
               var body = '';
			   var isOkTOHandle=true;
        req.on('data', function (data) {
			//console.log(data);
            body += decodeURIComponent(data);
             if (body.length >  10 || body.length <  3 ){   
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                 req.connection.destroy();
				 isOkTOHandle=false;
            }
        });
        req.on('end', function () { 
				if(!isOkTOHandle){
									            res.writeHead(300, 'NOT OK', {'Content-Type': 'text/html'})
            res.end('Too long!');
			return;
					
				}
					 try {
 						console.log(body);
 						var dirName=__dirname+'\\static\\Augme\\storedMindFiles\\'+body;
						
						if (!fs.existsSync(dirName)){
								fs.mkdirSync(dirName);
								 res.writeHead(200, 'OK', {'Content-Type': 'text/html'})
									res.end("Directory created." );  
							}
								else
								{ 
								 	res.writeHead(300, 'not OK', {'Content-Type': 'text/html'})
									res.end("Directory already exists." );   
								}

			  } catch (err) {
				console.log(err);
				            res.writeHead(300, 'NOT OK', {'Content-Type': 'text/html'})
            res.end('Something went wrong!');

			  } 
 
        });
}
catch(err){console.log(err);}
			
		}
			else if(req.url.trim()== '/api/linkerFileEntryConvert') { 
			
			try{
			
               var body = '';
			   var isOkTOHandle=true;
        req.on('data', function (data) {
			//console.log(data);
            body += data;
             if (body.length >  10 ){   
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                 req.connection.destroy();
				 isOkTOHandle=false;
            }
        });
        req.on('end', function () { 				 

				if(!isOkTOHandle  ){
									            res.writeHead(300, 'NOT OK', {'Content-Type': 'text/html'})
            res.end('Faulty call!');
			return;
					
				} 

					var infoNonExistant=true;
 					  	const readFileLines =   fs.readFileSync(__dirname+'\\static\\Augme\\storedMindFiles\\customNames_linker.txt').toString('UTF8').split('\n');
						for (let i = 0; i < readFileLines.length; i++) {
 						  if(readFileLines[i].indexOf(body) >= 0 && readFileLines[i].split("|")[0].trim() == body ){
							  
							  infoNonExistant=false
							   res.writeHead(200, 'OK', {'Content-Type': 'text/html'})
						 	res.end(readFileLines[i]);  

							  break; 
						}
 
									}
									if(infoNonExistant){
 							 res.writeHead(300, 'not OK', {'Content-Type': 'text/html'})
									res.end("Data does not exists." );   }

				   
				});
 
 
					 
			}
			catch(err){console.log(err);}
			
			}
		else if(req.url.trim()== '/api/customNameToList') { 
			try{
			
               var body = '';
			   var isOkTOHandle=true;
        req.on('data', function (data) {
			//console.log(data);
            body += decodeURIComponent(data);
             if (body.length >  100 ){   
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                 req.connection.destroy();
				 isOkTOHandle=false;
            }
        });
        req.on('end', function () { 
				if(!isOkTOHandle){
									            res.writeHead(300, 'NOT OK', {'Content-Type': 'text/html'})
            res.end('Faulty call!');
			return;
					
				}
					 try {
 						console.log(body);
 					//	var fileNames=body.split("|");
					 var fileName=__dirname+'\\static\\Augme\\storedMindFiles\\customNames_linker.txt' ;
					 try{
						fs.appendFileSync(fileName, body+"\r\n");
						 	  res.writeHead(200, 'OK', {'Content-Type': 'text/html'})
						 	res.end("File updated." );  

						}
						catch(err){
							 res.writeHead(300, 'not OK', {'Content-Type': 'text/html'})
									res.end("Linker file does not exists." );   
							
						}

						 

			  } catch (err) {
				console.log(err);
				            res.writeHead(300, 'NOT OK', {'Content-Type': 'text/html'})
            res.end('Something went wrong!');

			  } 
 
        });
}
catch(err){console.log(err);}
			
		}
		else if(req.url.trim()== '/api/uploadMind') {
		try{
			
               var body = '';
			    var isOkTOHandle=true; 
        req.on('data', function (data) {
			//console.log(data);
            body += data;
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB REF: https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
            if (body.length >  20 * 1000000){ //20MB // => 1mb = 1e6 ) {  
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                 req.connection.destroy();
				 isOkTOHandle=false;
            }
        });
        req.on('end', function () {
				if(!isOkTOHandle){
					 	res.writeHead(300, 'NOT OK', {'Content-Type': 'text/html'})
							res.end('Dangerous activity detected.');
							return; 
				}
           // var POST = JSON.parse(body);
			       //     console.log(body)
						
					 try {
						let buff = Buffer.from(body, 'base64');
						var dayNow=dateTimeDay().substring(2);// del first 2 chars
						var dirName=__dirname+'\\static\\Augme\\storedMindFiles\\'+dayNow;
						
						if (!fs.existsSync(dirName)){
								fs.mkdirSync(dirName);
							}								
								

					var uniqueFileName =  uuidv4().toString().slice(0,4);
					var fullpathName=dirName+"\\"+uniqueFileName+'.mind';					
					while (fs.existsSync(fullpathName)) {
						    uniqueFileName =  uuidv4().toString().slice(0,4);
					  fullpathName=dirName+"\\"+uniqueFileName+'.mind';

						} 
						
						
  				  fs.writeFileSync(fullpathName, buff,{ encoding: "utf8" } );//REF: https://stackoverflow.com/questions/6926016/how-can-i-save-a-base64-encoded-image-to-disk & https://stackoverflow.com/questions/37128883/encode-a-string-using-windows-1252-in-node-js
				        

						res.writeHead(200, 'OK', {'Content-Type': 'text/html'})
            res.end(uniqueFileName+dayNow );//'Data received.');

			  } catch (err) {
				console.log(err);
				            res.writeHead(300, 'NOT OK', {'Content-Type': 'text/html'})
            res.end('Something went wrong!');

			  }
			  

 
        });
}
catch(err){console.log(err);}
    } else if(req.url.trim()== '/api/uploadDataAfterMind') {
		try{
			
               var body = '';
        req.on('data', function (data) {
			//console.log(data);
            body += data;
             if (body.length >  5 * 1000000){ //5MB  
                  req.connection.destroy();
            }
        });
        req.on('end', function () {

 					 try {
						 var parts = body.split("|");
  						var dirName=__dirname+'\\static\\Augme\\storedMindFiles\\'+parts[0].substring(4); 
                    
											 console.log(parts[0].substring(0,4));

					var uniqueFileName = parts[0].substring(0,4);
					 var fullpathName=dirName+"\\"+uniqueFileName+'.info';					
				 
 						
  				  fs.writeFileSync(fullpathName, parts[1]+"|"+parts[2]+"|"+parts[3],{ encoding: "utf8" } );  
 
						res.writeHead(200, 'OK', {'Content-Type': 'text/html'})
            res.end("/static/Augme/storedMindFiles/"+parts[0].substring(4)+"/"+uniqueFileName); 

			  } catch (err) {
				console.log(err);
				            res.writeHead(300, 'NOT OK', {'Content-Type': 'text/html'})
            res.end('Something went wrong!');

			  }
			  

 
        });
}
catch(err){console.log(err);}
    }
	else
	{
		          				res.writeHead(400,{"Content-Type" : "text/html"});  
            res.end('Wrong info.'); 
	}
	
	} else{
  if (feedbackUrl.trim() === '/') { 
        res.writeHead(200, {'Content-Type': 'text/html',   'Accept-Ranges': 'bytes',  'Cache-Control': 'no-cache'});
                     fs.createReadStream('iframe.html').pipe(res);//       fs.createReadStream('default_arjs_test.html').pipe(res); 
    }
		else   if (feedbackUrl.trim().toLowerCase().startsWith( '/mirror/')) { 
 						  
   	res.writeHead(200,{"Content-Type" : "text/html"});  
    res.end(decodeURIComponent(feedbackUrl.trim().toLowerCase().replace("/mirror/","").trim()));
 
    }
	else   if (feedbackUrl.trim().toLowerCase().startsWith( '/augmename')) {
		
    		 var path=__dirname+'\\static\\Augme\\storedMindFiles\\'+decodeURIComponent(feedbackUrl.trim().toLowerCase()).slice(10); 

  if (fs.existsSync(path)) {
       res.writeHead(200);
    res.end("true");
		} else
		{	       res.writeHead(200);
			res.end("false");
		}
		 
    }
	else   if (feedbackUrl.trim().toLowerCase().startsWith( '/augme')) { 
 						  
						   	fs.readFile(__dirname + "/static/Augme/AugmeHomePage.html", function (err,data) {     
    res.writeHead(200);
    res.end(data);
  }); 

    }
	else   if (feedbackUrl.trim().toLowerCase().startsWith( '/mindarcompiler')) { 
 						  
						   	fs.readFile(__dirname + "/static/Augme/compiler_to_product_oneshot.html", function (err,data) {     
    res.writeHead(200);
    res.end(data);
  }); 

    }
	else   if (feedbackUrl.trim().toLowerCase().startsWith( '/mindar')) { 
 						  
						   	fs.readFile(__dirname + "/static/Augme/iframe_mindAR_production.html", function (err,data) {     
    res.writeHead(200);
    res.end(data);
  }); 

    }	else  if	(feedbackUrl.trim().startsWith('/combine') )   {
  	fs.readFile(__dirname + "/QrAndQRACOMBINED.html", function (err,data) {     
    res.writeHead(200);
    res.end(data);
  }); 
}
		else  if	(feedbackUrl.trim().startsWith('/Q') )   { // databased page. Info after the Q
  	fs.readFile(__dirname + "/iframe.html", function (err,data) {   
    res.writeHead(200);
    res.end(data); 
  }); 
}
		
		
		else  if	(feedbackUrl.trim().startsWith('/read')  ||  feedbackUrl.trim() ==('/qr') )   {
	   res.writeHead(200, {'Content-Type': 'text/html', 'Accept-Ranges': 'bytes',  'Cache-Control': 'no-cache'});
              fs.createReadStream('readQrA.html').pipe(res)
	}
else  if	(feedbackUrl.trim().startsWith('/iframe')  ) {
	   res.writeHead(200, {'Content-Type': 'text/html', 'Accept-Ranges': 'bytes',  'Cache-Control': 'no-cache'});
              fs.createReadStream('iframe.html').pipe(res)
	} 
		else  if	(feedbackUrl.trim().startsWith('/noborderframe')  )   {
	   res.writeHead(200, {'Content-Type': 'text/html', 'Accept-Ranges': 'bytes',  'Cache-Control': 'no-cache'});
	   var htmlPage =   fs.createReadStream('iframe.html');  
      getStream(htmlPage).then(r=>  res.end(r)); 
	}
	else  if	(feedbackUrl.trim().startsWith('/vrframe')  )   {
	   res.writeHead(200, {'Content-Type': 'text/html', 'Accept-Ranges': 'bytes',  'Cache-Control': 'no-cache'});
              fs.createReadStream('VRiframe.html').pipe(res)
	}
	else if	(feedbackUrl.trim().startsWith('/qramaker') ) {
 	fs.readFile(__dirname + "/static/QrA_Maker/index.html", function (err,data) {     
    res.writeHead(200);
    res.end(data);
  }); 
	}
	else if	(feedbackUrl.trim().startsWith('/vrqramaker') ) {
 	fs.readFile(__dirname + "/static/QrA_Maker/indexVR.html", function (err,data) {     
    res.writeHead(200);
    res.end(data);
  }); 
	}
	else if	(feedbackUrl.trim().startsWith('/memo') ) {
		
		var decodeString=unescape(feedbackUrl.replace('/memo','') ).trim();
 		var feedbackUrlParts = decodeString.replace('/memo','').trim().split("|");
		if(feedbackUrlParts.length == 2)
		{
 
	for (let i = 0; i < memoList.length; i++) {
	 
	 if(memoList[i].user == feedbackUrlParts[0].trim())
	 {
		   memoList.splice(i, 1);
		 break;
		 
	 }
 			}
 
					memoNote = {user:feedbackUrlParts[0].trim(),text:feedbackUrlParts[1].trim(),date:dateTimeNow()};
				memoList.push(memoNote);
				res.writeHead(200,{"Content-Type" : "text/html"});//res.writeHead(200,{"Content-Type" : "text/plain"});
		    		    res.end("Success!!<br>Call your memo: /call" +feedbackUrlParts[0].trim());//res.end("Hello World<br><b> w</b>");

			
		}
			else
			{
 				res.writeHead(200,{"Content-Type" : "text/html"});
		    		    res.end("Form of a memo: /memoNAME|MESSAGE");
				
			}
	}
	else if	(feedbackUrl.trim().startsWith('/call') ) {
		
		var decodeString=unescape(feedbackUrl.replace('/call','') ).trim();
	var feedback="Entry not found";
	for (let i = 0; i < memoList.length; i++) {
	 
 	 if(memoList[i].user == decodeString)
	 {
		 feedback=memoList[i].text;
		 
	 }
 			}
 				res.writeHead(200,{"Content-Type" : "text/html"}); 
		    		    res.end(feedback); 

	}
   else{  
  fs.readFile(__dirname + feedbackUrl, function (err,data) {//REF:https://stackoverflow.com/questions/16333790/node-js-quick-file-server-static-files-over-http
    if (err) {
     // res.writeHead(404);
   //   res.end(JSON.stringify(err));
   //   return;
	      res.writeHead(404);
    res.end("Nothing to be found here...");

    }else{
				const head = {
     'Content-Type': mime.lookup(__dirname + feedbackUrl),
}

    res.writeHead(200,head);
    res.end(data);}
  });
  
  }
  }
}).listen(port, () => {
    console.log("Our app is running on port ${ PORT }. (Default = 8010)");
});}