import { Brand, Err, Ok, Result } from "../utils";

export function doSomethingWithAnEmployee(id: EmployeeId) {
  // make an api call, something expense
}

export type EmployeeId =
  | `X${string}`
  | `x${string}`
  | `A${string}`
  | `a${string}`;

export function isValidEmployeeId(id: string): id is EmployeeId {
  return (
    id.startsWith("x") ||
    id.startsWith("X") ||
    id.startsWith("A") ||
    id.startsWith("x")
  );
}

type TechId = Brand<string, "TechId">;
type ApiError = {
  status: number;
  message: string;
};
export const verifyTechId = (candidateId: string): Result<TechId, ApiError> => {
  const isValid = candidateId.startsWith("T");
  if (isValid) {
    return Ok(candidateId as TechId);
  } else {
    return Err({ status: 404, message: "No Tech with that Id" });
  }
};

export const doSomethingWithATech = (id: TechId) => {
  // do something
};
export function assignTechToCustomerIssue(assignment: {
  techId: string;
  issueId: string;
  customerId: string;
}) {}

export type Url = `http://${string}/` | `https://${string}/`;
