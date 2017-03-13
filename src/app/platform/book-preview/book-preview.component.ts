import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { getLargeImage } from '../../shared/getLargeImage';
import { Book } from '../../shared/models/book.model';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.scss']
})
export class BookPreviewComponent {

  @Input() book: Book;

  constructor(private sanitizer: DomSanitizer) {
  }

  sanitize(url: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${getLargeImage(url)}')`);
  }
}
