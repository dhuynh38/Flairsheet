import { Component, OnInit } from '@angular/core';

import { ContentService } from '../services/content/content.service';
import { FileService } from '../services/file/file.service';

import { Content } from '../models/content';

/**
 * Component that represents the feed of content.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _contents: Content[];
  private _contentIds: any;

  /**
   * Contructs the component and injects all parameters.
   */
  public constructor(private _contentService: ContentService,
    private _fileService: FileService) {
  }

  /**
   * Angular runs after creating the component.
   */
  public ngOnInit() {
    this._contents = [];
    this._contentService.getContent().subscribe((result: any) => {
      this._contentIds = result;
      const partialContentIds = this._contentIds.splice(0, 4);
      for (const contentId of partialContentIds) {
        this._contentService.getContentWithId(contentId._id).subscribe((result2) => {
          this._contents.push(result2);
        }, (err) => {
          console.log('Error: Failed To Retrieve Content');
        });
      }
    }, (err) => {
      console.log('Error: Failed To Get All Content');
    });
  }

  /**
   * Getter for contents.
   * @returns {Content[]} an array of content objects
   */
  public get contents(): Content[] {
    return this._contents;
  }

  /**
   * Method that updates the content array on scroll of the mouse button.
   */
  public onScroll(): void {
    console.log('scrolled!!');
    const partialContentIds = this._contentIds.splice(0, 5);
    for (const contentId of partialContentIds) {
      this._contentService.getContentWithId(contentId._id).subscribe((result2) => {
        this._contents.push(result2);
      }, (err) => {
        console.log('Error: Failed To Retrieve Content');
      });
    }
  }

}
