import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output
} from '@angular/core';

import { ImageModel } from '../models/image.model';

@Directive({
  selector: '[dragFile]'
})
export class DragFileDirective {

  @Input() public images: ImageModel[] = [];
  @Output() private onMouseOver: EventEmitter<boolean>;

  constructor() {
    this.onMouseOver = new EventEmitter();
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: any): void {
    this.preventBehavior(event);
    this.onMouseOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any): void {
    this.onMouseOver.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any): void {
    const transfer = this.getTransferedFile(event);
    if (!transfer) return;
    this.extractFiles(transfer.files);
    this.preventBehavior(event);
    this.onMouseOver.emit(false);
  }

  private getTransferedFile(event: any) {
    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer;
  }

  private extractFiles(files: FileList): void {
    for (const prop in Object.getOwnPropertyNames(files)) {
      const tmpFile = files[prop];
      if (this.fileCanBeUploaded(tmpFile)) {
        this.images.push(new ImageModel(tmpFile));
      }
    }
  }

  // Validaciones
  private fileCanBeUploaded(file: File): boolean {
    return this.isImage(file.type) && !this.imageAlreadyExists(file.name);
  }

  private preventBehavior(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private imageAlreadyExists(name: string): boolean {
    return !!this.images.find(image => image.fileName === name);
  }

  private isImage(type: string): boolean {
    return !!type && type.startsWith('image/');
  }

}
