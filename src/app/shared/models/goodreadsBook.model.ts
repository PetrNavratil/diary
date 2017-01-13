export interface GRBook {
  id: number,
  title: string,
  author: GRAuthor,
  imageUrl: string,
  smallImageUrl: string
  originalPublicationYear: string,
  originalPublicationMonth: string,
  originalPublicationDay: string,
  averageRating: string,
}

interface GRAuthor {
  id: number,
  name: string
}


export function makeGRBook(input: any): GRBook {
  return {
    id: input.best_book.id['#content'],
    title: input.best_book.title,
    author: makeGRAuthor(input.best_book.author),
    imageUrl: input.best_book.image_url,
    smallImageUrl: input.best_book.small_image_url,
    originalPublicationYear: getDate(input.original_publication_year),
    originalPublicationMonth: getDate(input.original_publication_month),
    originalPublicationDay: getDate(input.original_publication_day),
    averageRating: input.average_rating
  }
}

function getDate(input: any) {
  return input['#content'] ? input['#content'] : '';
}

function makeGRAuthor(input: any): GRAuthor {
  return {
    id: input.id['#content'],
    name: input.name
  }
}