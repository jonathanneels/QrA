Do you know what Augmented Reality needs?! <br>
A way to generate AR-website objects. So you can have 3D-like online chats, arcade fun, movies and streams on one spot and just walk away to let it "dissapear". 

I believe this open-source addition opens up a whole new world for AR; you don't have to know 3D or the three.js framework to make beautiful ideas. <br>You only need to know how to make (or refer to) a website.
<br><br>
How it works. 
You scan a qr-code. The url sends you to a site. When the camera remains focussed on the qr-code a website will now pop-ups! 
<br><br>
Libs:<br>
QrA uses tilt-js to simulate 3D-effects (parallax) and AR.js a-box as the startobject. 

<br><br>
Local:<br>
Download the project and launch it with the cmd command "node index.js".<br>
Surf to  HTTPS://127.0.0.1:4444 or  HTTPS://127.0.0.1:4444/iframe to the scanpage. <br>
You can have an VR-AR experience if you go to  HTTPS://127.0.0.1:4444/vrframe.<br>
If you want to generate your own QrA links; surf to  HTTPS://127.0.0.1:4444/qramaker after launching the project. <br>
The VR version is  HTTPS://127.0.0.1:4444/vrqramaker<br><br>
=> The above urls also work on https://qr-a.herokuapp.com/ <br>
Test with <img style='height:120px;height:120px;'src="https://github.com/jonathanneels/QrA/blob/main/static/scanables/heroku_example.jpg"> </img><br>
or<br>
<img style='height:120px;height:120px;'src="https://github.com/jonathanneels/QrA/blob/main/static/scanables/heroku_example.jpg"> </img>

<br><br>
Note:<br>
If you look in the iframe.html file you'll see wild - outcommented - positional transformations when showing a site from an angle. <br>I've purposely dampen the angle calculations to make a simple, realistic AR websurfing experience. <br>
That does not mean you can tinker with the file to generate rollercoaster-like effects! 
<br><br>



PS:<br>
If you like what I do you can visit https://jonathanneels.itch.io/pog8 make some noise and maybe buy me a beer.
