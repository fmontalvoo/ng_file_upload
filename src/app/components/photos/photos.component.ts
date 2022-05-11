import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Image } from 'src/app/models/image.model';

import { UploadFilesService } from 'src/app/services/upload-files.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styles: [
  ]
})
export class PhotosComponent implements OnInit, OnDestroy {

  public images: Array<Image>;
  private subscription!: Subscription;

  constructor(private ufs: UploadFilesService) {
    this.images = new Array();
  }

  ngOnInit(): void {
    this.subscription = this.ufs.getImages()
      .subscribe(images => {
        this.images = images;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
