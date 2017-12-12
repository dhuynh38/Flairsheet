# Flairsheet
A social media platform designed to provide anyone with the ability to show off their skills through a flairsheet containing images, videos, and information about themselves. Skills can be anything. We provide the platform. We rely on the users to bring people to the platform and create whatever they want.

Users who show off their skills on the website can generate money for themselves in many different ways:
1) They can turn on the ads option and ads will be put on their page to generate them revenue.
2) Any other user can donate to the users who show off their skills to support their skills or what they're doing
3) Users can sell things on their flairsheet and generate money off of that. They can offer to perform any custom service for the people who like their skills
4) They can get a sponsorship from random companies who want to work with them.
5) They can get hired by some random company to work for them

How we generate money:
1) We will take a percentage of everything above. A relatively small percentage as we're providing them with the tools to make money.

How will we expand and retain users:
1) I want this to be something that everyone and anyone can use. Anyone from a 10 year old to a 50 year old can use this platform. Content on this website needs to bring users back daily. You know how you open facebook or youtube daily to view things. I want this platform to have that pull on people.
2) Users who bring people to the platform through referrals or just straight up followers will get a reduced percentage taken out of their revenue.

ANY of the above can be changed. Talk to me (Duy) for any suggestions, comments, or criticisms.
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
1) Angular 2.0+ Documentation:
https://angular.io/
2) Angular Material (basic building blocks):
https://material.angular.io/
3) Flex Layout:
https://github.com/angular/flex-layout/wiki/API-Documentation
4) Flex Layout Conceptual:
https://css-tricks.com/snippets/css/a-guide-to-flexbox/
5) Useful Data Binding Angular 2.0: https://www.infragistics.com/community/blogs/dhananjay_kumar/archive/2016/12/12/simplifying-two-way-data-binding-in-angular-2.aspx
6) Observables (different style of Promises):
http://reactivex.io/rxjs/manual/overview.html
7) Database Query Functions:
http://mongoosejs.com/docs/api.html

## Installation and Setup Process ##

## Install Node.js and NPM ##
DESCRIPTION: Node.js is basically an engine/compiler that allows us to run javascript outside of the browser. Each module in the node_modules is basically its own package and as a result of dependencies, installing one package will lead to us installing all of the packages that it needs to work. That is why we have so many packages in the node_modules folder. Everything that is located in node_modules can be installed from the package.json file.
The package.json file includes all of the dependencies of our project. When we do npm install, npm installs all of the dependencies that our projects need. NPM stands for Node Package Manger and is basically just an installer that installs sofware from other developers that available. These come from open source projects. The package.json file is basically lists what our project is including licensing, devDependencies, and dependencies. Dependencies are what packages are required to run our app and devDependencies are what packages we need to develop the app.The scrips section state what all the scrips that we can run using: npm run <script>.

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
    For node: v8.9.1 (Should be updated by now)
    For npm: 5.5.1 (Should be updated by now)

## Install Angular CLI ##
DESCRIPTION: This is just a client that does everything for us and generates stuff for us based on commands. You build and run your front-end using this. When working, you can use the command `ng serve --poll=2000` to serve up a copy of your code to localhost:4200 in the browser. You can view your code live and every time you save a file after modifying, the website will refresh. Use `ng g <what should be generated> <name of file to be generated>` to generate components, services, and even modules. In the name paramete, you can put in a file path using a `/`. Finally, you can build using `ng build` or `ng build --prod`. Building for production adds in ahead-of-time compilation for javascript and other stuff to minimize the code to be deployed. Alot more details below.

1) Run the command:
    sudo npm install -g @angular/cli

2) If the command gives you weird popup messages, then exit the install and run the
command again. The second time I ran the command it worked perfectly.

3) Verify if it is installed, run the command:
    ng -v

4) At the writting of this guide, your version should match or be close to:
    Angular CLI: 1.5.0 (Should be updated by now)

## Install MongoDB ##
DESCRIPTION: This is our database. It basically stores everything as documents or json. It's a lot simpler for what we're doing because it lets us change the schema of our data quickly and can scale pretty well.

1) Download MongoDB from:
https://www.mongodb.com/download-center#community

2) Following instructions on:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

## Install Editor ##
DESCRIPTION: To code well, you need an editor that you know well. Visusal Studio Code is a new open source editor that has code completion and almost everything like IntelliJ. However, everything about it is free and open source. Generally, when developing software, you should try to use free and open source software so you don't have to worry about paying extra costs for licensing and such. I recommend using VS Code because it's pretty cool right now. A majority of developers on Youtube and other sites use this editor. Also, it's good to learn how to use a good idea without relying on IntelliJ the whole time. To be a really good developer, you should never put your all of your skills into a single thing. Be knowledgeable of everything, be diversified.

1) Download the editor on: https://code.visualstudio.com/

2) There are a lot of support and plugins for this editor. It's easy to install them as well.   It basically has everything IntelliJ has but you just gotta find the right plugins. Click on the "Square" icon on the left bar, to see all the extensions. Some of useful extensions that I have that I recommend you install:
  Angular 5 Snippets - Typscript, Html, Angular Material, ngRx, RxJS & Flex Layout
  Atom One Dark Theme
  Atom One Light Theme
  Auto Close Tag
  Beautify
  Blank Line at the End of File
  C/C++
  CSS Peek
  Darcula IntelliJ Theme
  Debugger for Chrome
  EditorConfig for VS Code
  ESLint
  Git History (git log)
  Git Lens - git blame annotations...
  Guides
  HTML CSS Support
  HTML Snippets
  IntelliJ IDEA Keybindings
  IntelliSense for CSS class names
  npm
  npm Intellisense
  One Dark Pro
  Path Intellisense
  Python
  stylelint
  Trailing Spaces
  TSLint
  vscode-icons
  Auto Import by steoates

A lot of the extensions especially the themes are unnecessary for this particular project but I think the rest are useful.

### To run MongoDB server locally: ###
1) Navigate to your forked project repo.
2) Make a new folder in the folder and name it: data
3) To start up the mongoDB server itself inside the flairsheet folder, run command:
  mongod --dbpath=data
4) To use the mongoDB shell, run command:
  mongo

EXPLANATION: the mongod command starts up the database server and allow you to connect to the database. The mongo comamnd opens up a terminal for the database that allows you to run commands on the database and what is stored in the database itself. Basically, allows you to make queries.

## Pull down the respository ##
1) Go to the flairsheet repo.
2) Fork your own copy of the repo by hitting the fork icon on the top right
   corner of the repo.

OPTIONAL (If you want to push and fetch without having to enter email and password everytime):
  1) Follow instructions to generate ssh keys on: https://confluence.atlassian.com/bitbucketserver/creating-ssh-keys-776639788.html
  2) You should have a private ssh key and a public ssh key stored somewhere on your computer now. The public ssh key you give to Github so it can recognize you and you keep the private key. Github compares the public key and private key to identify that your computer is you.
  3) When you go to clone, clone using ssh or copy the ssh url.

2) Find a good place to put the forked project and do:
    git clone <url>
3) Run the command:
    git remote -vv
4) You should see origin with the url that you just used to clone.
5) Go to the main repo and copy the clone url. Set up upstream with the command:
    git remote add upstream <url>
6) cd into the repository and run:
    npm install

IMPORTANT: So how we are doing this is that we all work on our own forks. Each
issues done should have its own branch on your fork. Every branch should be brand new and be updated to master. Master will be what we're merging to for right now. We don't have a release yet so I don't think we need a separate branch for that. When you are done with an issue,
create a pull request to master and wait for others to review the PRs. At least
one other person must review it before merging. If you found any bugs or want any features implemented, post them in the issues section of github. Make sure it's detailed so others can
reproduce and understand what it is. If you want to work on something you can just pick something from issues and work on it. Assign your name to it.

## Install MongoDB Compass ##
DESCRIPTION: This is the GUI for the MongoDB database. It lets us see all of our data in an easy to view way.

1) Download MongoDB Compass from:
https://www.mongodb.com/download-center?filter=enterprise#compass

2) Select 'Community Stable Version' and your platform.

3) Fill in the boxes with whatever information. It's an email list so
you can put fake information.

4) Install instructions from:
https://docs.mongodb.com/compass/master/install/#download-compass

5) Make sure your MongoDB sever is up and running.

6) Fill in the following information:
  Hostname: localhost
  Port: 27017

7) Click connect

## Connecting to the server ##
DESCRIPTION: This is the DigitalOcean remote access server that we're using to deploy the server and client. You can ssh into this server with your computer using the ssh below. This
server uses the production branch to deploy the app. This server doesn't have that much processing power or RAM so it can't build on its own. That's why I made a production branch with everything already built. I would then just have to pull down the files into the server.
This is optional and I can do everything if needed.

1) Talk to me so I can add you to the server.

2) Run the command to SSH into the server as admin:
    ssh admin@162.243.170.145

3) Give me your public key and I can add you to the admin keys.

4) Password For sudo on server: flairadmin7

## To update the current angular app production ##
(This is a weird method because it's a workaround. Our
server doesn't have enough RAM to build prod)
1) Checkout origin production branch on your computer:
    git checkout production

2) Pull in new changes from upstream's master branch:
    git pull upstream master

3) Build production on your computer:
    ng build --prod
    npm run compile-server

4) Add, commit, and push up new changes to upstream's production branch:
    git add .
    git commit
    git push origin production

5) ssh into digital ocean's server using admin:
    ssh admin@162.243.170.145

6) Navigate to flairsheet folder
    cd flairsheet

7) Make sure you're in production branch:
    git checkout production

8) Pull down changes from production branch:
    git fetch --all
    git rebase

9) Run the command:
    npm install
    pm2 delete 0
    pm2 start ./dist/server/index.js

10) Exit the server with command:
    exit

## Optional ##
### Install Lighthouse (Progressive Web App Analyzer) ###
DESCRIPTION: This is a chrome plugin by Google that checks to see if our app matches the description of a Progressive Web App and has all of the things that make a PWA good.

1) Go to https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk/related?hl=en

2) Add the extension to Chrome.

3) Run the test by navigating to flairsheet.com and clicking on the Lighthouse icon

4) Click generate report to see how the app is compliant to Google standardss

## Useful Commands ##
### Development server ###

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Run `ng serve -prod` to serve up a production server. Run `ng serve --poll=2000` if your code doesn't refresh on save.
A production server has service workers and is more like what our actualy app is on the site.

### Code scaffolding ###

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`. Example: To generate a service for a rocket, run `ng generate component RocketComponent`

### Build ###

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests ###

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). You don't have to do any testing since we are a small group and can just ask each other when something goes wrong.

## SERVER: ##
### MongoDB For The Server Only: ###
#### Start Mongo Server ####
sudo systemctl start mongod
#### Get status of Mongo Server ####
sudo systemctl status mongod
#### Restart Mongo Server ####
sudo systemctl restart mongod
#### Ensures Mongo Server starts at boot ####
sudo systemctl enable mongod
#### Login into Mongo Shell with Credentials ####
mongo -u admin -p --authenticationDatabase admin
mongo -u <username> -p --authenticationDatabase <databaseUserStoredAt>

### PM2 (Process Manger): ###
DESCRIPTION: This is our main app manager. It controls the app and restarts the app when the
server crashes or is rebooted. This is what we mainly use to deploy our app.
#### Show status of apps running: ####
pm2 status
#### Start the app ####
pm2 start server
pm2 start <appFile>

### Nginx ###
DESCRIPTION: This is the backend proxy server that enables us to host our app securely.
It sets up all secure connections to us and runs our encryptions. This is the
reason why our app has https.
#### Start nginx server ####
sudo systemctl start nginx
#### Restart nginx server ####
sudo systemctl restart nginx
