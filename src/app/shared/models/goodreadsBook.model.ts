export interface GoodReadsBook {
  id: number,
  books_count: number,
  ratings_count: number,
  text_reviews_count: number,
  original_publication_year: number,
  original_publication_month: number,
  original_publication_day: number,
  average_rating: number,
  book: GRBook
}

interface GRBook {
  id: number,
  title: string,
  author: GRAuthor,
  image_url: string,
  small_image_url: string
}

interface GRAuthor {
  id: number,
  name: string
}