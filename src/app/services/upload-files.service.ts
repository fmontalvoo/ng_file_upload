import { Injectable } from '@angular/core';

import { ImageModel } from '../models/image.model';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  private IMAGE_FOLDER = 'images';

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {

  }

  public saveImage(image: { name: string, url: string }) {
    return this.afs.collection(this.IMAGE_FOLDER).add(image);
  }

  public uploadImages(images: ImageModel[]) {
    for (const image of images) {
      image.isUploading = true;
      if (image.progress >= 100)
        continue;

      const path = `${this.IMAGE_FOLDER}/${image.fileName}`;
      const task = this.storage.upload(path, image.file);
      const ref = this.storage.ref(path);

      task.percentageChanges()
        .subscribe(progress => progress ? image.progress = progress : 0);

      task.snapshotChanges().pipe(
        finalize(() => {
          const downloadURL = ref.getDownloadURL()
          downloadURL.subscribe(url => (image.url = url,
            image.isUploading = false,
            this.saveImage({ name: image.fileName, url })));
        })
      ).subscribe();
    }
  }
}
