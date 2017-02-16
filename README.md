# Bitcoin Stats Electron App

## Overview
An Electron application built specifically for a Raspberry Pi 3 running a 7" display but can be easily modified for 
other displays and operating systems.  The backend is powered by Node.js v6.9 and Express. The frontend is built using Angular 1.5 and Angular Material.
All data is from the [Blockchain.info API](https://blockchain.info/api).

You can find detailed information about this project via my blog posts below.
- [Part 1](http://theonist.com/build-a-raspberry-pi-bitcoin-ticker-part-1/) - Setting up the Raspberry Pi
- [Part 2](http://theonist.com/build-a-raspberry-pi-bitcoin-ticker-part-2/) - Electron overview & server side code
- [Part 3](http://theonist.com/build-a-raspberry-pi-bitcoin-ticker-part-3/) - Front end code & autostart guide

## Setup & Local Development
1. Install Node.js >= v6.9.5. (Using [NVM](https://github.com/creationix/nvm) is recommended)
2. `npm install`
3. `bower install`
4. `npm start` to launch the application in development mode

**NOTE**:  If you plan to make large amounts of requests to Blockchain.info, request an API
code [here](https://blockchain.info/api/create_wallet) and enter your personal API code in `controllers/apiCode.js`

## Running on Raspberry Pi
It is currently not possible, or at least easy, to create an electron installer targeted for Linux ARM.
See this electron-builder [issue](https://github.com/electron-userland/electron-builder/issues/778) for more information.

If you wish instead to autostart this app during the Pi's startup follow these steps:
1. Clone this repo to your Pi
2. Run `npm install && bower install`
3. Modify line 5 of `btc-autostart.sh` to cd into the root directory of your cloned app
4. As root run the following commands to make the `btc-autostart.sh` executable
```
  sudo chown pi:pi /path/to/btc-autostart.sh
  sudo chmod +x /path/to/btc-autostart.sh
```
5. Edit your Pi's LXDE `autostart.sh` file to run this applications `btc-autostart.sh` file
```
  sudo nano /home/pi/.config/lxsession/LXDE-pi/autostart.sh
```
6. At the end of this file add a line pointing to this applications `btc-autostart.sh` file
```
  /path/to/btx-autostart.sh
```
7. Save and exit the file
```
  Ctrl + X, Y, Enter
``` 
8. Restart your Pi and the app should now automatically start

## Application Screenshot
![screenshot](https://cloud.githubusercontent.com/assets/6364918/22814786/e65c36f2-ef1b-11e6-8790-6a87528fc89a.png)
