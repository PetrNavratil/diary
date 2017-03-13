import { BookStatus } from './book-status.enum';

export interface Book {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  status: BookStatus;
  inBooks: boolean;
}
