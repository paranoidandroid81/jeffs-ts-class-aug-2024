import { FormControl } from '@angular/forms';

export type AngularFormMapper<T> = {
  [Property in keyof T]: FormControl<T[Property]>;
};
