import * as bluebird from 'bluebird';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as expressJwt from 'express-jwt';
import * as express from 'express';
import * as fs from 'fs';
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
  private _authenticator: expressJwt.RequestHandler;
  private _rsaPublicKey: Buffer;

  /**
   * Contructs the component and injects all parameters.
   */
  public constructor() {
    this._app = express();
    this._config = new Config();
    this._rsaPublicKey = fs.readFileSync(`${__dirname}/security/server.crt`);
    this._authenticator = expressJwt({
      secret: this._rsaPublicKey,
      algorithms: ['RS256']
    }).unless({
      path: [
        /* Allow calls without /api, /api/user/create/, and api/user/login */
        /(^\/(?!(api)).*$)|(^\/api\/user\/((create)|(login))$)/i
      ]
    });
    this.setup();
  }

  /**
   * Getter for the app.
   * @returns {express.Application} the express app
   */
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
    mongoose.connect(this._config.mongoUrlLab || process.env.PORT, {
      useMongoClient: true,
      promiseLibrary: bluebird
    }).then(() => {
      console.log('Connected successfully to lab database.');
    }).catch((err) => {
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
    this._app.use(this._authenticator);
    this._app.use(this.errorHandler);

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

  /**
   * Handles all the errors coming from the express server that has not
   * been handles already.
   * @param {any} err the error received
   * @param {express.Request} req the request that caused the error
   * @param {express.Response} res the response to be sent back to the client
   * @param {express.NextFunction} next the next function to be executed
   */
  private errorHandler(err: any, req: express.Request,
    res: express.Response, next: express.NextFunction): void {
    console.log('ERROR SENT');
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({
        message: 'Error: Unauthorized Access.'
      });
    } else {
      res.status(500).json({
        message: 'Error: Unknown'
      });
    }
  }

}

export default new Server().app;
