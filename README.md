# Morse Code Poster
This follows a video I made on making a digital poster 

We broke it down to 3 steps 
- coding the poster in p5.js
- uploading it
- setting up the digital display with raspberry pi

So we will break down each step 

<br>

### Coding the poster 
this part was detailed heavily in the video, so you can use it as a refrence 

<br>

### uploading it 
For hosting your p5.js Sketch you have a couple of options
	
 _Option 1:_ Host on [GitHub Pages](https://docs.github.com/en/pages/quickstart) / [Netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/) / Vercel (easy).

 _Option 2:_ Host locally on the Pi (using Python or Node.js HTTP server):
 ```
sudo apt install npm
npm install -g http-server
http-server /home/pi/sketches -p 8080
```

<br>

### setting up the digital display with raspberry pi 
Here is where the grunt of the work will happen so let's start with a list of equipments needed 

#### 🧰 Hardware You Need
| What    | Wy |
| -------- | ------- |
| Raspberry Pi   | Main brain    |
| MicroSD card (16GB+) | Storage for the OS     |
| Power Supply (5V 2.5A)    | To power your Pi  |
| HDMI Cable (full-size)  | Video output (to monitor/TV)   |
| Monitor/TV (HDMI input) | Display your Pi’s desktop     |
| Keyboard + Mouse (USB)    | Initial setup (optional later)    |
| USB Wi-Fi Adapter  | For wireless internet   |
| Ethernet Cable (optional) | Direct network connection    |


<br>

no wlet's go over the setup process one by one

#### 1️⃣ Flash the Raspberry Pi OS Lite/Desktop
1. Use [Raspberry Pi Imager](https://www.raspberrypi.com/software/)
2. Select a recommended OS for your Pi
3. Flash it onto your microSD card (16-32GB).

#### 2️⃣ Hardware Setup
1.	Insert the microSD card into your Pi
2.	Plug in the Wi-Fi dongle or Ethernet cable
3.	Connect HDMI to your wall-mounted monitor
4.	Power on using Micro USB power adapter
5.	Attach keyboard/mouse for setup

#### 3️⃣ First Boot Setup
1.	Complete setup wizard (time zone, language, etc.).
2.	Connect to the network: Use Wi-Fi dongle setup or Ethernet.
3.	Run system updates:
   ```
sudo apt update
sudo apt full-upgrade -y
```

#### 4️⃣ Install Chromium Browser (Lightweight Version)
Chromium will run fine, but use lighter flags to optimize performance
```
sudo apt install -y chromium-browser
```

#### 5️⃣ Create the Kiosk Mode Script
1.	Create the script folder and file:
```
mkdir ~/kiosk
nano ~/kiosk/start_kiosk.sh
```

2.	Paste in the kiosk commands:
```
#!/bin/bash
xset s off
xset -dpms
xset s noblank
chromium-browser --noerrdialogs --disable-infobars --kiosk --app=http://your-p5js-sketch-url
```
⚠️ Replace the URL with your hosted sketch or local address

3.	Save and make the script executable:
```
chmod +x ~/kiosk/start_kiosk.sh
```

#### 6️⃣ Auto-Start Kiosk on Boot
1.	Edit the LXDE autostart config:
```
nano ~/.config/lxsession/LXDE-pi/autostart
```

2.	Add:
```
@lxterminal -e /home/pi/kiosk/start_kiosk.sh
```

3.	Save and reboot to test:
```
sudo reboot
```

hopfully if you follow these steps, you'll have your own digital poster.
Would love to see the sketches you come up with 
