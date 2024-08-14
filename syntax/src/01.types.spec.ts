import { describe, test, expect } from "vitest";
describe("Opting in to Type Checking", () => {
  test("Uninitialized is Any", () => {
    let age;
    age = 13;

    // 3 hours later

    age = "Old";
  });

  test("Initialize and the type is inferred", () => {
    let age = 13;

    age = 14;
    expect(typeof age).toBe("number");

    //  @ts-expect-error
    age = "Old";

    expect(typeof age).toBe("string");
  });

  test("unitialized should have an annotation", () => {
    let age: number;
    age = 13;

    // 3 hours later
    // @ts-expect-error
    age = "Old";
  });
  test("unitialized should have an annotation", () => {
    let age: number | string = 13;

    age = "Old";
  });

  test("why var is bad", () => {
    if (true) {
      var x = 12;
    }

    expect(x).toBe(12); // leaks
  });

  test("equality", () => {
    let age = 16;

    let areEqual = age === +"16";
    let notEqual = age !== +"17";
    expect(areEqual).toBe(true);
    expect(notEqual).toBe(true);
  });

  test("truthiness", () => {
    // if a non boolean value is converted to a boolean, does it convert to  true or false.

    let isTruthy = !!"dog";
    expect(isTruthy).toBe(true);
    expect("dog").toBeTruthy();
    expect(" ").toBeTruthy();
    expect("").toBeFalsy();
    expect(0).toBeFalsy();
    expect(-1).toBeTruthy(); // but any number aside from 0 is truthy
    expect({}).toBeTruthy();
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();
  });
});
