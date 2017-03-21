import { Pipe } from '@angular/core';
import { BookStatus } from './models/book-status.enum';

@Pipe({name: 'bookStatus'})
export class BookStatusPipe {

  transform(value: number): string {
    switch (value) {
      case BookStatus.NOT_READ:
        return 'Not read';
      case BookStatus.TO_READ:
        return 'To read';
      case BookStatus.READING:
        return 'Reading';
      case BookStatus.READ:
        return 'Read';
      default:
        return 'Not read';
    }
  }
}