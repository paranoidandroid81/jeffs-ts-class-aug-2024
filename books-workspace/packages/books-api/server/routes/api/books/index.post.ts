import { BookCreateModel } from "shared-types";
import { BookCreate } from "~~/types/books";
import { z } from "zod";

const BookCreateSchema = z
  .object({
    title: z.string(),
    author: z.string(),
    year: z.number(),
  })
  .strict(); // plan b: don't allow things OTHER than this, either.
// plan a: then use Zod again to map it to what I really want.
export default eventHandler(async (event) => {
  const { addBook } = useBooks();
  const user = event.context.user.sub;

  const body = await readBody(event);

  const bookValid = BookCreateSchema.safeParse(body);
  if (bookValid.success) {
    const book = { ...bookValid.data, owner: user } as BookCreateModel;
    return await addBook(book);
  } else {
    throw createError({
      status: 400,
    });
  }
});
