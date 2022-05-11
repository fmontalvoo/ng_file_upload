import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output
} from '@angular/core';

@Directive({
  selector: '[dragFile]'
})
export class DragFileDirective {

  @Output() private onMouseOver: EventEmitter<boolean>;

  constructor() {
    this.onMouseOver = new EventEmitter();
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: any) {
    this.onMouseOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.onMouseOver.emit(false);
  }

}
