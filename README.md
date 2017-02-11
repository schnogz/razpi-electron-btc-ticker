# Bitcoin Stats Electron App

## Overview
An Electron application built specifically for a Raspberry Pi 3 running a 7" display but can be easily modified for 
other displays and operating systems.  The backend is powered by Node.js v6.9 and Express. The frontend is built using Angular 1.5 and Angular Material.
All data is from the [Blockchain.info API](https://blockchain.info/api).

I have written [blog posts](http://theonist.com/build-a-raspberry-pi-bitcoin-ticker-part-1/) that go into detail about the project overall.

## Setup & Local Development
1. Install Node.js >= v6.9.5. (Using [NVM](https://github.com/creationix/nvm) is recommended)
2. `npm install`
3. `bower install`
4. If you plan to make large amounts of requests to Blockchain.info, request an API 
code [here](https://blockchain.info/api/create_wallet).
5. Enter your personal API code in `controllers/apiCode.js` or set the export value to `null`.
6. `npm start` to launch the application

## Screenshot
![screenshot](https://cloud.githubusercontent.com/assets/6364918/22814786/e65c36f2-ef1b-11e6-8790-6a87528fc89a.png)
