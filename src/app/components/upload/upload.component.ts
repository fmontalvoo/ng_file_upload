import { Component, OnInit } from '@angular/core';

import { ImageModel } from 'src/app/models/image.model';

import { UploadFilesService } from 'src/app/services/upload-files.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: [
  ]
})
export class UploadComponent implements OnInit {

  public images: ImageModel[] = [];

  constructor(private ufs: UploadFilesService) { }

  ngOnInit(): void {
  }

  public uploadImages() {
    this.ufs.uploadImages(this.images);
  }

}
