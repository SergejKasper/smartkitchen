# smartkitchen
============

SmartKitchen is an open-source project to provide a basic REST-Architecture for mobile Clients.
The goal was to create a REST-API, which could be accessed by a desctop and mobile client. 
Three modules are included:

1. A [Node.js](http://nodejs.org/) Server to set-up and access the NoSQL database [MongoDB](http://www.mongodb.org/) for CRUD operations while offering a Rest-API to provide said operations to a client

2. An [AngularJS](https://github.com/angular/angular.js) Single-Page Application using the [JQueryMobile CSS](https://github.com/angular-widgets/angular-jqm) to be run in the browser.

3. A hybrid App build with [PhoneGap](http://phonegap.com/) to provide the Single-Page Application to mobile devices, while including services to  use PhoneGap's Plug-ins for the access of native device functionality

## Setup
=====

Download the project from [here](https://github.com/SergejKasper/smartkitchen) 
or clone it using [Git](http://git-scm.com/):

```sh
$ git clone https://github.com/SergejKasper/smartkitchen.git
```

### Step 1: Server
==========

a. [Install](http://nodejs.org/) Node.js 

b. [Install](http://docs.mongodb.org/manual/installation/) MongoDB 

c. Run the server. You can also pass a custom PORT to listen , if you like

```sh
$ cd smartkitchen/server
$ PORT=5000 node app.js
```
d. access the API at http://localhost:4000/recepies, with 4000 beeing the default port

### Step 2: Client
==========
You can serve the client's index.html as static content. 
I recomand using node's comand-line http-server to host any dir you like with:

```sh
http-server [path] [options]
```

a. You can install the server with

```sh
sudo npm install http-server -g
```

b. Now you can serve the content of smartkitchen/client on a custom port like 9000 with

```sh
$ http-server smartkitchen/client -p 9000
```
The index.html is picked up, when you open http://localhost:9000

### Step 3: App
==========
b. Install PhoneGap via npm and go into the app's folder
```sh
$ cd smartkitchen/app/SmartKitchen
$ sudo npm install g cordova
```
c. Check for the istalled and availible platforms 
```sh
cordova platform
```
d. (Optional) Add a platform. NOTE: Did only test the app on android thus far
 
 ```sh
$ cordova platform add [myPlatform]
```

e. Setting the path to the API. TODO: Externelize the path settings.

Open smartkitchen/app/www/js/services.js in your editor/ide of trust and set the ip and port from within the angular service to the external ip of the Machine and the port you are running the server on. If the machine with the server and the device are both within the LAN, the conf might be something like:
 ```sh
		function($resource) {
			return $resource('http://192.168.43.108:port/recepies/:recepieId', {port:':4000'});
		}
```

f. Build the App from comand-line. The platform's name is optional
 ```sh
$ cordova build [myPlatform]
```

g. (Optional) Prepare an Android Device to run the app
NOTE: You can use the (Android Debug Bridge)[http://www.droidwiki.de/ADB] to access an Andorid device. If you have an AndroidSDK installed, you can make sure the device is attached and has debuging activated in it's settings.

```sh
adb devices
```
the device should be listed. 

h. Run the app on a platform

 ```sh
$ cordova run [myPlatform]
```