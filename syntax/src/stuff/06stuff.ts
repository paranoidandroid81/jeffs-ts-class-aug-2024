export type Employee = {
  id: string;
  name: string;
  job: "DEV" | "QA" | "MGMT";
  salary: number;
};

type UpdateableEmployee = Pick<Employee, "name" | "job">;

type EmployeeCreate = Omit<Employee, "id">;

export function hireEmployee(emp: EmployeeCreate) {
  // do the stuff
  const newEmployee: Employee = {
    id: crypto.randomUUID(),
    ...emp, // spread them out here.
  };
  return newEmployee;
}

export function updateSomeOfTheEmployee(
  id: string,
  emp: Partial<UpdateableEmployee>
) {}

type EmployeeKeys = keyof Employee;
export function updateSomePropertyOfTheEmployee(
  prop: EmployeeKeys,
  emp: Employee,
  newValue: string
) {
  // but the prop has to be a specific key of the employee type
}
export type Actor = {
  name?: string;
  age?: number;
};

export function saveActorForNow(actor: Actor) {
  // save it off somewhere to get back to later
}

export function saveActorForRealz(actor: Required<Actor>) {
  // nothing is options now.
}

export type BankTransaction =
  | { kind: "Deposit"; amount: number }
  | { kind: "Withdrawal"; amount: number };

export function doTransaction(
  accountNumber: string,
  tx: Readonly<BankTransaction>
) {
  // "side effect"
  //   tx.amount = tx.amount * 1.3;
}
