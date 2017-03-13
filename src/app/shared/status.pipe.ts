import { Pipe } from '@angular/core';
import { BookStatus } from './models/book-status.enum';

@Pipe({name: 'bookStatus'})
export class BookStatusPipe {

  transform(value: number): string {
    switch (value) {
      case BookStatus.NOT_READ:
        return 'NOT READ';
      case BookStatus.TO_READ:
        return 'TO READ';
      case BookStatus.READING:
        return 'READING';
      default:
        return 'NOT READ';
    }
  }
}