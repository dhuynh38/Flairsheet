import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as Grid from 'gridfs-stream';
import * as mongoose from 'mongoose';
import * as Multer from 'multer';

import { NextFunction, Request, Response, Router } from 'express';

import Content from '../models/content';
import User from '../models/user';

/**
 * Router to handle all requests to /api/content/*
 */
class ContentRouter {

  private _router: Router;
  private _gridFS: Grid;
  private _uploader: Multer;

  constructor() {
    this._uploader = Multer({
      dest: './dist/uploads/'
    });
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
   * POST: Saving a content file to the database.
   * @param {any} req the request itself coming from the user
   * @param {Response} res the response to be sent to the user
   */
  private uploadContent(req: any, res: Response): void {
    this._gridFS = Grid(mongoose.connection.db, mongoose.mongo);
    const writestream = this._gridFS.createWriteStream();
    fs.createReadStream(req.file.path).pipe(writestream);

    writestream.on('close', (file) => {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log(err);
        }
      });

      const newContent = new Content({
        title: req.body.title,
        titleOriginal: req.body.title,
        description: req.body.description,
        author: req.user.sub,
        contentType: req.body.contentType,
        major: req.body.major,
        minor: req.body.minor,
        file: file._id
      });

      Content.create(newContent).then((data) => {
        User.findById(req.user.sub).then((user) => {
          user.get('myContents').push(data.get('_id'));
          user.save().then((updatedUser) => {
            res.status(201).json({
              message: 'Success'
            });
          }).catch((err3) => {
            console.log(err3);
            res.status(500).json({
              message: 'Error: Cannot Save Contents To User.'
            });
          });
        }).catch((err2) => {
          console.log(err2);
          res.status(500).json({
            message: 'Error: Cannot Find User To Save Content.'
          });
        });
      }).catch((err) => {
        console.log(err);
        res.status(500).json({
          message: 'Error: Creating Content Failed.'
        });
      });
    });
  }

  /**
   * Sets all the routes and attach methods to deal with
   * those routes.
   */
  private routes(): void {
    this._router.route('/upload').post(this._uploader.single('file'),
      (req, res) => this.uploadContent(req, res));
  }
}

export default new ContentRouter().router;
