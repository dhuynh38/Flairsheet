import * as bcrypt from 'bcrypt';
import * as bluebird from 'bluebird';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as ms from 'ms';

import { NextFunction, Request, Response, Router } from 'express';

import Config from '../config/config';
import User from '../models/user';

/**
 * Router to handle all requests to /api/user
 */
class UserRouter {

  private _config: Config;
  private _router: Router;
  private _rsaPrivateKey: Buffer;

  constructor() {
    bluebird.promisifyAll(bcrypt);
    this._router = Router();
    this._router.use(bodyParser.json());
    this._rsaPrivateKey = fs.readFileSync(`${__dirname}/../security/server.key`);
    this._config = new Config();
    this.routes();
  }

  /**
   * Getter for router.
   * @returns {Router} the server router
   */
  public get router(): Router {
    return this._router;
  }

  /**
   * Creates and signs a token with the private key for a
   * user based on the id.
   * @param {string} id the _id of the user to create a token for
   */
  private createTokenKey(id: string): Buffer {
    return jwt.sign(
      {},
      this._rsaPrivateKey,
      {
        algorithm: 'RS256',
        expiresIn: ms(this._config.tokenExpirationTime),
        subject: id
      }
    );
  }

  /**
   * GET: get all the users in the database.
   * @param {Request} req the request itself coming from the user
   * @param {Response} res the response to be sent to the user
   */
  private getUsers(req: Request, res: Response): void {
    User.find({}).then((data) => {
      res.status(200).json({
        data
      });
    }).catch((err) => {
      res.status(500).json({
        message: 'Error: Cannot Get Users.'
      });
    });
  }

  /**
   * POST: create a new user in the database.
   * @param {Request} req the request itself coming from the user
   * @param {Response} res the response to be sent to the user
   */
  private createUser(req: Request, res: Response): void {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const usernameOriginal = req.body.usernameOriginal;
    const email = req.body.email;
    const birthday = req.body.birthday;
    const sex = req.body.sex;
    const verified = req.body.verified;

    bcrypt.hash(req.body.password, 10).then((hash) => {
      const password = hash;
      const newUser = new User({
        firstname,
        lastname,
        username,
        usernameOriginal,
        email,
        password,
        birthday,
        sex,
        verified
      });

      User.create(newUser).then((data) => {
        res.status(201).json({
          token: {
            key: this.createTokenKey(data.get('_id').toHexString()),
            expiresIn: this._config.tokenExpirationTime
          }
        });
      }).catch((err) => {
        res.status(500).json({
          message: 'Error: Creating User Failed'
        });
      });
    }).catch((err) => {
      res.status(500).json({
        message: 'Error: Hashing Password Failed'
      });
    });
  }

  /**
   * POST: login a user into the app.
   * @param {Request} req the request itself coming from the user
   * @param {Response} res the response to be sent to the user
   */
  private loginUser(req: Request, res: Response): void {
    User.findOne({ email: req.body.email.toLowerCase() }).then((data) => {
      bcrypt.compare(req.body.password, data.get('password')).then((correctPassword) => {
        if (correctPassword) {
          res.status(200).json({
            token: {
              key: this.createTokenKey(data.get('_id').toHexString()),
              expiresIn: this._config.tokenExpirationTime
            }
          });
        } else {
          res.status(401).json({
            message: 'Error:  Invalid Email Or Password.'
          });
        }
      }).catch((err) => {
        res.status(500).json({
          message: 'Error: Password Verification Process Failed.'
        });
      });
    }).catch((err) => {
      res.status(401).json({
        message: 'Error: Invalid Email Or Password.'
      });
    });
  }


  /**
   * Sets all the routes and attach methods to deal with
   * those routes.
   */
  private routes(): void {
    this._router.route('/').get((req, res) => this.getUsers(req, res));
    this._router.route('/create').post((req, res) => this.createUser(req, res));
    this._router.route('/login').post((req, res) => this.loginUser(req, res));
  }
}

export default new UserRouter().router;
