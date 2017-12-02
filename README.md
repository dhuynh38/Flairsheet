# Flairsheet
A social media platform designed to provide anyone with the ability to show off their skills through a flairsheet containing images, videos, and information about themselves. Skills can be anything.

## To install the app on mobile devices ##
### iPhone ###
1) Navigate to flairsheet.com
2) Press the Box with the Arrow icon on the bottom of the Safari Browser
2) Scroll the Menu at the bottom to the right to see 'Add to Homescreen' button
3) Press that button and you should have it on your homescreen

### Android phones ###
1) Navigate to flairsheet.com
2) Press the + icon on the top left of the browser to install
3) Or a banner should popup asking for installation.

### Useful Documentation ###
Angular 2.0+ Documentation: https://angular.io/
Angular Material (basic building blocks): https://material.angular.io/
Flex Layout: https://github.com/angular/flex-layout/wiki/API-Documentation
Flex Layout Conceptual: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
Useful Data Binding Angular 2.0: https://www.infragistics.com/community/blogs/dhananjay_kumar/archive/2016/12/12/simplifying-two-way-data-binding-in-angular-2.aspx

## Installation  and Setup Process ##

## Install Node.js and NPM ##
1) Download the LTS version on:
https://nodejs.org/en/download/

2) Follow the instructions if you're not on Ubuntu:        https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
If you're on Ubuntu, run the commands:
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo apt-get install -y build-essential

3) Verify if they are both installed, run the commands:
    node -v
    npm -v

4) At the writting of this guide, your version should match or be close to:
    For node: v8.9.1
    For npm: 5.5.1

## Install Angular CLI ##
(this is just a client that does everything for us and generates stuff for us based on commands)
1) Run the command:
    sudo npm install -g @angular/cli

2) If the command gives you weird popup messages, then exit the install and run the
command again. The second time I ran the command it worked perfectly.

3) Verify if it is installed, run the command:
    ng -v

4) At the writting of this guide, your version should match or be close to:
    Angular CLI: 1.5.0

## Install MongoDB ##
1) Download MongoDB from:
https://www.mongodb.com/download-center#community
2) Following instructions on:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

## Pull down the respository ##
1) Go to gihub and find the clone url
2) Find a good place to put the project and do:
    git clone <url>
3) cd into the repository and run:
    npm install

## Connecting to the server ##
1) Talk to me so I can add you to the server.
2) Run the command to SSH into the server as admin:
    ssh admin@162.243.170.145
3) Give me your public key and I can add you the admin keys.
3) Password For Sudo: flairadmin7

## To update the current angular app production ##
1) Build production on your computer:
    ng build --prod
2) Push all your changes including your dist folder up to master
3) ssh into digital ocean's server using admin:
    ssh admin@162.243.170.145
4) Navigate to flairsheet folder
5) Pull down changes from master:
    git fetch --all
    git rebase
6) Run the command:
    npm install
    pm2 delete 0
    pm2 start server
7) Exit the server with command:
    exit

## Optional ##
### Install Lighthouse (Progressive Web App Analyzer) ###
1) Go to https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk/related?hl=en
2) Add the extension to Chrome.
3) Run the test by navigating to flairsheet.com and clicking on the Lighthouse icon
4) Click generate report to see how the app is compliant to Google standardss

## Useful Commands ##
### Development server ###

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Run `ng serve -prod` to serve up a production server.
A production server has service workers and is more like what our actualy app is on the site.

### Code scaffolding ###

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`. Example: To generate a service for a rocket, run `ng generate component RocketComponent`

### Build ###

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests ###

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). You don't have to do any testing since we are a small group and can just ask each other when something goes wrong.

### MongoDB: ###

#### Start Mongo Server ####
sudo systemctl start mongod

#### Get status of Mongo Server ####
sudo systemctl status mongod

#### Restart Mongo Server ####
sudo systemctl restart mongod

#### Ensures Mongo Server starts at boot ####
sudo systemctl enable mongod

#### Login into Mongo client with Credentials ####
mongo -u admin -p --authenticationDatabase admin
mongo -u <username> -p --authenticationDatabase <databaseUserStoredAt>

### PM2 (Process Manger): ###
This is our main app manager. It controls the app and restarts the app when the
server crashes or is rebooted. This is what we mainly use to deploy our app.
#### Show status of apps running: ####
pm2 status

#### Start the app ####
pm2 start server
pm2 start <appFile>

### Nginx ###
This is the backend proxy server that enables us to host our app securely.
It sets up all secure connections to us and runs our encryptions. This is the
reason why our app has https.
#### Start nginx server ####
sudo systemctl start nginx

#### Restart nginx server ####
sudo systemctl restart nginx