import * as bluebird from 'bluebird';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';

import Config from './config/config';

import UserRouter from './routers/user-router';

/**
 * A class that represents a server by setting up the connection
 * to the database, attaching all the middlewares, and linking all
 * the routes.
 */
class Server {

  private _app: express.Application;
  private _config: Config;

  constructor() {
    this._app = express();
    this._config = new Config();
    this.setup();
  }

  public get app() {
    return this._app;
  }

  /**
   * Sets up all the middlewares needed for the server and
   * connects the server to the mongo database.
   */
  private setup(): void {
    /* Set up mongo db connection */
    (<any>mongoose).Promise = bluebird;
    mongoose
      .connect(this._config.mongoUrl || process.env.PORT, {
        useMongoClient: true,
        promiseLibrary: bluebird
      })
      .then(() => {
        console.log('Connected successfully to database');
      })
      .catch((err) => {
        console.log(err);
      });

    /* Set up all the middlewares */
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({
      extended: false
    }));
    this._app.use(cookieParser());
    this._app.use(compression());
    this._app.use(helmet());
    this._app.use(logger('dev'));
    this._app.use(cors());

    this._app.use(express.static(path.join(__dirname, '../app')));
    this.routes();
  }

  /**
   * Sets up the REST endpoints that this server can go to.
   */
  private routes(): void {
    this._app.use('/api/user', UserRouter);
    this._app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../app/index.html'));
    });
  }
}

export default new Server().app;
