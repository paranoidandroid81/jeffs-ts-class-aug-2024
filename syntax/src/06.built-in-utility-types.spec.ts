import { describe, expect, test } from "vitest";
import {
  Actor,
  BankTransaction,
  doTransaction,
  Employee,
  hireEmployee,
  saveActorForNow,
  saveActorForRealz,
  updateSomeOfTheEmployee,
  updateSomePropertyOfTheEmployee,
} from "./stuff/06stuff";

describe("Built-In Utility Types", () => {
  test("Partial", () => {
    updateSomeOfTheEmployee("99", { job: "DEV", name: "Bob Smith" });
  });

  test("keys", () => {
    const bob: Employee = {
      id: "99",
      name: "Bob Smith",
      job: "QA",
      salary: 128_000,
    };

    updateSomePropertyOfTheEmployee("name", bob, "Robert");

    const employee = hireEmployee({
      name: "Carol Jones",
      job: "MGMT",
      salary: 180_0000,
    });
    console.log(employee);

    const movie = {
      title: "Empire Strikes Back",
      director: "Kershner",
      yearReleased: 1981,
    };

    type Movie = typeof movie;

    const rotj: Movie = {
      title: "Return of the Jedi",
      director: "Kasdan",
      yearReleased: 1985,
    };
    type MovieKeys = keyof Movie;

    const somProp: MovieKeys = "title";

    var workInProcess: Actor = {
      name: "Steve",
    };

    saveActorForNow(workInProcess);

    workInProcess.age = 48;

    // @ts-expect-error
    saveActorForRealz(workInProcess);
    const t = { kind: "Deposit", amount: 3000 } satisfies BankTransaction;

    doTransaction("999", t);

    expect(t).toEqual({ kind: "Deposit", amount: 3000 });
  });
});
