import { Injectable } from '@angular/core';

import { ImageModel } from '../models/image.model';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  private IMAGE_FOLDER = 'images';

  constructor(private af: AngularFirestore, private afs: AngularFireStorage) {

  }

  public saveImage(image: { name: string, url: string }) {
    return this.af.collection(this.IMAGE_FOLDER).add(image);
  }

  public uploadImages(images: ImageModel[]) {
    console.log('uploadImages', images);
  }
}
