import { describe, test } from "vitest";
import {
  calculateExpectedDeliveryDate,
  isUndeliveredOrder,
  Order,
  UnDeliveredOrder,
} from "./shipping";

describe("Shipping Orders", () => {
  test("shipped-orders", () => {
    const order: Order = {
      status: "pending",
      customerId: "99",
      orderId: "12",
    };

    const expectedDate = calculateExpectedDeliveryDate(order);

    // some kind of expectation
  });

  test("pending-orders", () => {
    const order: Order = {
      status: "shipped",
      customerId: "99",
      orderId: "12",
      shipDate: "2024-08-13 ",
    };

    const expectedDate = calculateExpectedDeliveryDate(order);

    // some kind of expectation
  });
  test("delivered-orders", () => {
    const order: Order = {
      status: "delivered",
      customerId: "99",
      orderId: "12",
      shipDate: "2024-08-13 ",
      deliveryDate: "2024-08-14",
    };

    // @ts-expect-error
    const expectedDate = calculateExpectedDeliveryDate(order);

    // some kind of expectation
  });

  test("more real world", () => {
    const order1: Order = {
      status: "shipped",
      customerId: "99",
      orderId: "12",
      shipDate: "2024-08-13 ",
    };

    const order2: Order = {
      status: "pending",
      customerId: "99",
      orderId: "12",
    };

    const order3: Order = {
      status: "delivered",
      customerId: "99",
      orderId: "12",
      shipDate: "2024-08-13 ",
      deliveryDate: "2024-08-14",
    };

    const orders = [order1, order2, order3];

    const listOfDeliveryDates = orders // all the orders [o1, o2, o3]
      .filter(isUndeliveredOrder) // [o1, o2]
      .map(calculateExpectedDeliveryDate); // [date, date]

    console.log(listOfDeliveryDates);
  });
});
