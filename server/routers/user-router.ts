import * as bcrypt from 'bcrypt';
import * as bluebird from 'bluebird';
import * as bodyParser from 'body-parser';
import { NextFunction, Request, Response, Router } from 'express';

import User from '../models/user';

/**
 * Router to handle all requests to /api/user
 */
class UserRouter {

  private _router: Router;

  constructor() {
    bluebird.promisifyAll(bcrypt);
    this._router = Router();
    this._router.use(bodyParser.json());
    this.routes();
  }

  /**
   * Getter for router.
   */
  public get router(): Router {
    return this._router;
  }

  /**
   * GET: get all the users in the database.
   * @param req the request itself coming from the user
   * @param res the response to be sent to the user
   */
  private getUsers(req: Request, res: Response): void {
    User.find({})
    .then((results) => {
      res.status(200).json({ results });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  }

  /**
   * POST: create a new user in the database.
   * @param req the request itself coming from the user
   * @param res the response to be sent to the user
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

    bcrypt.hash(req.body.password, 10)
      .then((hash) => {
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

        User.create(newUser)
          .then((results) => {
            res.status(201).json({
              results
            });
          })
          .catch((err) => {
            res.status(500).json({
              err
            });
          });
      })
      .catch((err) => {
        console.log('Hash Failed');
      });
  }

  /**
   * POST: login a user into the app.
   * @param req the request itself coming from the user
   * @param res the response to be sent to the user
   */
  private loginUser(req: Request, res: Response): void {
    User.findOne({ email: req.body.email})
      .then((results) => {
        bcrypt.compare(req.body.password, results.get('password'))
          .then((response) => {
            if (response) {
              results.set('password', '');
              res.status(200).json({ results });
            } else {
              res.status(401).json({ error: 'Login Failed' });
            }
          });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }

  /**
   * Sets all the routes and attach methods to deal with
   * those routes.
   */
  private routes(): void {
    this._router.route('/').get(this.getUsers);
    this._router.route('/create').post(this.createUser);
    this._router.route('/login').post(this.loginUser);
  }
}

export default new UserRouter().router;
