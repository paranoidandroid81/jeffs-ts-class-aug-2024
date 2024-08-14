import { BooksResponseModel } from "shared-types";

export default eventHandler(async (event) => {
  const { loadBooks } = useBooks();

  const books = await loadBooks();
  const response: BooksResponseModel = {
    books,
  };
  return response;
});
