# Bitcoin Stats Electron App

## Overview
An Electron application built specifically for a Raspberry Pi 3 running a 7" display but can be easily modified for 
other displays and operating systems.  The backend is powered by Node.js v6.9 and Express. The frontend is built using Angular 1.5 and Angular Material.
All data is from the [Blockchain.info API](https://blockchain.info/api).

I have written a blog post [here](http://theonist.com) that goes into detail about the project overall.

## Setup & Development
1) Install Node.js >= v6.9.5. (Using [NVM](https://github.com/creationix/nvm) is recommended)
2) `npm install`
3) `bower install`
4) `npm start`


## TODO's
- JS files 
  - bundling
  - minification
  - linting
- Live reload (nodemon gulp watch)
- Electron app compilation/release
