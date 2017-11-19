# FlairSheet
A social media app designed to enable people to show off their skill through a flairsheet containing images, videos, and information about themselves.

#Installation  and Setup Process:

#Install Node.js and NPM:
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

#Install Angular CLI:
(this is just a client that does everything for us and generates stuff for us based on commands)
1) Run the command:
    sudo npm install -g @angular/cli

2) If the command gives you weird popup messages, then exit the install and run the
command again. The second time I ran the command it worked perfectly.

3) Verify if it is installed, run the command:
    ng -v

4) At the writting of this guide, your version should match or be close to:
    Angular CLI: 1.5.0

#Install MongoDB:
1) Download MongoDB from:
https://www.mongodb.com/download-center#community
2) Following instructions on:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

#Pull down the respository:
1) Go to gihub and find the clone url
2) Find a good place to put the project and do:
    git clone <url>
3) cd into the repository and run:
    npm install

#Connecting to the server:
1) Talk to me so I can add you to the server.
2) Run the command to SSH into the server as admin:
    ssh admin@162.243.170.145
3) Give me your public key and I can add you the admin keys.
3) Password For Sudo: flairadmin7

##To update the current angular app
1) ssh into admin:
    ssh admin@162.243.170.145
2) Pull down changes from master:
    git fetch --all
    git rebase
3) Run the command:
    build