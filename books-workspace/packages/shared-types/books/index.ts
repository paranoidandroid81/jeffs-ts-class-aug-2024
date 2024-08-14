export type BookResponseItemModel = {
  id: string;
  title: string;
  year: number;
  author: string;
};

export type BooksResponseModel = {
  books: BookResponseItemModel[];
};

export type BookCreateModel = Omit<BookResponseItemModel, "id">;
