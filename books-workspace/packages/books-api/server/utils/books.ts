import { createPool } from "generic-pool";
import { Book, BookCreate } from "~~/types/books";
import { connect } from "ts-postgres";
import type { Client } from "ts-postgres";
import { BookResponseItemModel } from "shared-types";
import { z } from "zod";

const BookItemSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    year: z.number(),
  })
);
const pool = createPool(
  {
    create: async () => {
      const client = await connect({
        host: "localhost",
        port: 5439,
        user: "user",
        password: "password",
        database: "catalog",
      });
      return client;
    },
    destroy: async (client) => {
      return client.end();
    },
    validate: async (client) => {
      return !client.closed;
    },
  },
  { testOnBorrow: true }
);

const loadBooks = async () => {
  return await pool.use(async (client: Client) => {
    const query = client.query<{ id: String; book: Book }>(
      "SELECT * FROM books"
    );
    const result = (await query).rows;
    const books = result.map((row) => row[1]);

    const response = BookItemSchema.safeParse(books);
    if (response.success) {
      return response.data as BookResponseItemModel[];
    } else {
      // do your logging and alert the cops, whatever.
      // response.error
    }
  });
};

const getBook = async (id: string) => {
  return await pool.use(async (client: Client) => {
    const query = client.query<{ id: String; data: Book }>(
      "SELECT * FROM books WHERE id = $1",
      [id]
    );
    try {
      const result = await query.one();
      return result?.data;
    } catch (e) {
      return null;
    }
  });
};

const addBook = async (book: BookCreate) => {
  return await pool.use(async (client: Client) => {
    const id = crypto.randomUUID();
    const query = client.query<{ id: String; book: Book }>(
      "INSERT INTO books (id, data) VALUES ($1, $2) RETURNING *",
      [id, { ...book, id, created: new Date() }]
    );
    const result = (await query).rows[0];
    return result[1];
  });
};
export const useBooks = () => {
  return {
    loadBooks,
    addBook,
    getBook,
  };
};
