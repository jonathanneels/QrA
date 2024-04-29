Do you know what Augmented Reality needs?! 
A way to generate AR-website objects. So you can have 3D-like online chats, arcade fun, movies and streams on one spot and just walk away to let it "dissapear". 

I believe this open-source addition opens up a whole new world for AR; you don't have to know 3D or the three.js framework to make beautiful ideas. You only need to know how to make (or refer to) a website.

How it works: 
You scan a qr-code. The url sends you to a site. When the camera remains focussed on the qr-code a website will now pop-ups! 

Libs:
QrA uses tilt-js to simulate 3D-effects (parallax) and AR.js a-box as the startobject. 
The iframe gets pushed by the tilt.js functions and the AR cube's .position, .scale and .rotation is used as reference.

Local:
Download the project and launch it with the cmd command "node index.js".
If you have a QrA-code then you can use the following reader: HTTPS://127.0.0.1:4444/qr
Surf to  HTTPS://127.0.0.1:4444 or HTTPS://127.0.0.1:4444/iframe to the scanpage. 
You can have an VR-AR [very experimental!] experience if you go to  HTTPS://127.0.0.1:4444/vrframe.
If you want to generate your own QrA links; surf to  HTTPS://127.0.0.1:4444/qramaker after launching the project. 
A version without a border can be called by HTTPS://127.0.0.1:4444/noborderframe.
The VR version [very experimental!] is  HTTPS://127.0.0.1:4444/vrqramaker
=> The above urls also work on https://qr-a.herokuapp.com/ 


Note:
If you look in the iframe.html file you'll see wild - outcommented - positional transformations when showing a site from an angle. I've purposely dampen the angle calculations to make a simple, realistic AR websurfing experience. 
That does not mean you can tinker with the file to generate rollercoaster-like effects! 



PS: 
If you make your own QrA links, I suggest using an URL shortener like https://tinyurl
QrA homepage: https://qr-a.herokuapp.com  QrA-link on home: https://tinyurl

PS 2:
If you like what I do you can visit https://jonathanneels.itch.io/pog8 make some noise and maybe buy me a beer.


Important Notice:

This project has been in development for several years. It includes a subproject called "Augme," which uses the MindAR.js library to create web pages with augmented reality. 
Unlike traditional QR(A)-based AR projects, Augme uses complex images as AR references instead of classic QR(A) codes. This approach offers a more dynamic and complex AR experience.
Please note that while the Augme subproject itself is not open source, its underlying code is. I encourage you to use it to create something unique!





