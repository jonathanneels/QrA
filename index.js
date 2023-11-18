const https = require('https');
//const http = require('http');
 const fs = require('fs');
 
const options = {
  key: fs.readFileSync('testkey.pem'),
  cert: fs.readFileSync('test.crt')//cert.pem
};

 var port = 4444;
 var ip= "127.0.0.1";
 
 var memoNote = {user:"",text:"",date:dateTimeNow()};
 var memoList=[];

 require('dns').lookup(require('os').hostname(), function (err, add, fam) {
 // console.log('addr: '+add);
  ip = add; // if netwerk allows it - Windows  Firewall - https://stackoverflow.com/questions/5489956/how-could-others-on-a-local-network-access-my-nodejs-app-while-its-running-on/5490033
 	console.log("HTTPS server started at https://"+ip+":" + port.toString());
	
	launchServer();
	
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

function getStream(stream) {
  return new Promise(resolve => {
    const chunks = [];

     stream.on("data", chunk => chunks.push(Buffer.from(chunk)));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString()));
  });
}



function launchServer(){
https.createServer(options, function (req, res) { 

var feedbackUrl = req.url;
   if (feedbackUrl.trim() === '/') { 
       //  res.writeHead(200, {'Content-Type': 'text/html' , 'Accept-Ranges': 'bytes',  'Cache-Control': 'no-cache'});
                   //       fs.createReadStream('iframe.html').pipe(res);//  fs.createReadStream('default_arjs_test.html').pipe(res); 
						  
						   	fs.readFile(__dirname + "/iframe.html", function (err,data) {     
    res.writeHead(200);
    res.end(data);
  }); 

    }
			else  if	(feedbackUrl.trim().startsWith('/combine') )   {
  	fs.readFile(__dirname + "/QrAndQRACOMBINED.html", function (err,data) {     
    res.writeHead(200);
    res.end(data);
  }); 
}
		else  if	(feedbackUrl.trim().startsWith('/read')  ||  feedbackUrl.trim() ==('/qr') )   {
	   //res.writeHead(200, {'Content-Type': 'text/html', 'Accept-Ranges': 'bytes',  'Cache-Control': 'no-cache'});
       //       fs.createReadStream('readQrA.html').pipe(res);
 	fs.readFile(__dirname + "/readQrA.html", function (err,data) {     
    res.writeHead(200);
    res.end(data);
  }); 

	}
	else  if	(feedbackUrl.trim().startsWith('/iframe')  )   {
	   res.writeHead(200, {'Content-Type': 'text/html', 'Accept-Ranges': 'bytes',  'Cache-Control': 'no-cache'});
              fs.createReadStream('iframe.html').pipe(res)
	}
	else  if	(feedbackUrl.trim().startsWith('/noborderframe')  )   {
	   res.writeHead(200, {'Content-Type': 'text/html', 'Accept-Ranges': 'bytes',  'Cache-Control': 'no-cache'});
	   var htmlPage =   fs.createReadStream('iframe.html');  
      getStream(htmlPage).then(r=>  res.end(r));//+"<label id='hideborder'> true </label>"));
	}
else  if	(feedbackUrl.trim().startsWith('/vrframe')  )   {
	   res.writeHead(200, {'Content-Type': 'text/html', 'Accept-Ranges': 'bytes',  'Cache-Control': 'no-cache'});
              fs.createReadStream('VRiframe.html').pipe(res)
	}
	else if	(feedbackUrl.trim().startsWith('/qramaker') ||  feedbackUrl.trim().startsWith('/make')) {
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
    res.writeHead(200);
    res.end(data);}
  });
  
  }
  
}).listen(port,"0.0.0.0");

 


}
