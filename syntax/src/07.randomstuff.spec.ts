import { describe, expect, test } from "vitest";

describe("Random stuff I want to show", () => {
  test("expand", () => {
    type Movie = {
      title: string;
      director?: string;
      meta: Record<string, string>;
    };
    const movie: Movie = { title: "Jaws", meta: {} };

    movie.meta.director = "Spielberg";

    movie.meta.yearReleased = "1977";

    expect(movie.meta.yearReleased).toBe("1977");
  });
});
