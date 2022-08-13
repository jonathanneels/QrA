Do you know what function Augmented Reality needs?! 
A way to generate AR-website objects. So you can have 3D-like online chats, arcade fun, movies and streams on one spot and just walk away to let it "dissapear". 

I believe this open-source addition opens up a whole new world for AR; you don't have to know 3D or the three.js framework to make beautiful ideas. You only need to know how to make (or refer to) a website.

How it works. 
You scan a qr-code. The url sends you to a site. When the camera remains focussed on the qr-code a website will now pop-ups! 

Libs:
QrA uses tilt-js to simulate 3D-effects (parallax) and AR.js a-box as the startobject. 


Local:
Download the project and launch it with the cmd command "node index.js".
Surf to 127.0.0.1:4444 or 127.0.0.1:4444/iframe to the scanpage. 
You can have an VR-AR experience if you go to 127.0.0.1:4444/vrframe.
If you want to generate your own QrA links; surf to 127.0.0.1:4444/qramaker after launching the project. 
=> The above urls also work on https://qr-a.herokuapp.com/ 


Note:
If you look in the iframe.html file you'll see wild - outcommented - positional transformations when showing a site from an angle. I've purposedly dampen that to make a simple, realistic AR websurfing experience. 
That does not mean you can tinker with the file to generate rollercoaster-like effects! 




PS:
If you like what I do you can visit https://jonathanneels.itch.io/pog8 make some noise and maybe buy me a beer.
