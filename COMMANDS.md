# Flairsheet

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

##MongoDB:

Start Mongo Server:
sudo systemctl start mongod

Get status of Mongo Server:
sudo systemctl status mongod

Restart Mongo Server:
sudo systemctl restart mongod

Ensures Mongo Server starts at boot:
sudo systemctl enable mongod

Login into Mongo client with Credentials:
mongo -u admin -p --authenticationDatabase admin
mongo -u <username> -p --authenticationDatabase <databaseUserStoredAt>

##PM2 (Process Manger):
Show status of apps running:
pm2 status

Start the app:
pm2 start server
pm2 start <appFile>

##Nginx
Start nginx server:
sudo systemctl start nginx

Restart nginx server:
sudo systemctl restart nginx