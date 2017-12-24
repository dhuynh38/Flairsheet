import * as bodyParser from 'body-parser';
import * as FormData from 'form-data';
import * as fs from 'fs';
import * as Grid from 'gridfs-stream';
import * as mongoose from 'mongoose';

import { NextFunction, Request, Response, Router } from 'express';

/**
 * Router to handle all requests to /api/file
 */
class FileRouter {

  private _router: Router;
  private _gridFS: Grid;

  constructor() {
    this._router = Router();
    this._router.use(bodyParser.json());
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
   * GET: Gets file data based on the given id
   * @param {any} req the request itself coming from the user
   * @param {Response} res the response to be sent to the user
   */
  private getFileWithId(req: any, res: Response): void {
    this._gridFS = Grid(mongoose.connection.db, mongoose.mongo);
    this._gridFS.createReadStream({
      _id: req.params.fileId
    }).pipe(
      res.status(200)
    );
  }

  /**
   * Sets all the routes and attach methods to deal with
   * those routes.
   */
  private routes(): void {
    this._router.route('/:fileId').get((req, res) => this.getFileWithId(req, res));
  }
}

export default new FileRouter().router;
