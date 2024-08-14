import { beforeAll, describe, expect, test } from "vitest";
import {
  assignTechToCustomerIssue,
  doSomethingWithAnEmployee,
  doSomethingWithATech,
  isValidEmployeeId,
  Url,
  verifyTechId,
} from "./employees";

import { HasNone, Option, HasSome } from "./utils";

describe("Mapped Types", () => {
  test("employee ids", () => {
    // we need a function that let's us know if a string has a valid employee id.
    // at our company employee ids start with.

    const id = "X00099";
    if (isValidEmployeeId("id")) {
      doSomethingWithAnEmployee(id);
    }

    doSomethingWithAnEmployee("x9999");

    const API_URL: Url = "https://localhost:1337/";

    // http.get(API_URL + 'books')

    const techId = "99";
    const customerId = "138";
    const issId = "420";

    assignTechToCustomerIssue({
      techId: techId,
      customerId: customerId,
      issueId: issId,
    });
  });

  test("branded types", () => {
    // let's call the data we aren't sure is a valid employee id
    // something like a "candidateId";

    const candidateId = "Tabc123"; // some data from outside - api, whatever

    const results = verifyTechId(candidateId);

    if (results.ok) {
      console.log(results.value);
      doSomethingWithATech(results.value);
    } else {
      console.log(results.error);
    }
  });
});

describe("utility types", () => {
  test("Options", () => {
    // Some Data from somewhere (API, whatever)
    const customers = [
      { id: "99", state: "OH", balance: 3000 },
      { id: "101", state: "KY", balance: 10_000 },
      { id: "200", state: "VA", balance: 99_000 },
    ];

    // What are the balances of my customers that owe me 100_000 or more?

    // const balances = customers
    //   .filter((c) => c.balance >= 100_000) // where
    //   .map((c) => c.balance); // select

    // if (balances.length > 0) {
    //   console.log(balances);
    // } else {
    //   console.log("Everybody is paid up!");
    // }

    type CustomerInfo = {
      id: string;
      state: string;
      balance: number;
    };

    const highBalances = highBalanceCustomers(customers, 10_000);
    switch (highBalances.tag) {
      case "None": {
        console.log(
          "No Customners with a balance equal to or greater than 50k"
        );
        break;
      }
      case "Some": {
        console.log("These balances are high", highBalances.value);
      }
    }

    function highBalanceCustomers(
      customers: CustomerInfo[],
      cutoff: number
    ): Option<number[]> {
      const balances = customers
        .filter((c) => c.balance >= cutoff)
        .map((c) => c.balance);

      if (balances.length === 0) {
        return HasNone();
      } else {
        return HasSome(balances);
      }
    }
  });
});
