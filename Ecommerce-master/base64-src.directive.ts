import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appBase64Src]',
})
export class Base64SrcDirective implements OnChanges {
  @Input() appBase64Src: String = '';
  constructor(private element: ElementRef) {}
  ngOnChanges() {
    if (this.appBase64Src) {
      this.element.nativeElement.src = `data:image/png;base64,${this.appBase64Src}`;
    }
  }
}
