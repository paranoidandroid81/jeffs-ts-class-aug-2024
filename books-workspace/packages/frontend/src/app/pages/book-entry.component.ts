import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BooksDataService } from '../services/books-data.service';
import { BookCreateModel } from 'shared-types';
import { AngularFormMapper } from '../../../shared';

@Component({
  selector: 'app-book-entry',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="add()">
      <label class="input input-bordered flex items-center gap-2 mb-4">
        Title:
        <input
          type="text"
          class="grow"
          placeholder=""
          formControlName="title"
        />
      </label>
      <label class="input input-bordered flex items-center gap-2 mb-4">
        Author:
        <input
          type="text"
          class="grow"
          placeholder=""
          formControlName="author"
        />
      </label>
      <label class="input input-bordered flex items-center gap-2 mb-4">
        Year Released:
        <input
          type="number"
          class="grow"
          placeholder=""
          formControlName="year"
        />
      </label>
      <button class="btn btn-primary" type="submit">Add</button>
    </form>
  `,
  styles: ``,
})
export class BookEntryComponent {
  #service = inject(BooksDataService);
  form = new FormGroup<AngularFormMapper<BookCreateModel>>({
    title: new FormControl<string>('', { nonNullable: true }),
    author: new FormControl<string>('', { nonNullable: true }),
    year: new FormControl<number>(0, { nonNullable: true }),
  });

  add() {
    this.#service.addBooks(this.form.value as BookCreateModel).subscribe(() => {
      this.form.reset();
    });
  }
}

// { title: string, author: string, year: number} =>
// { title: FormControl<string>, author: FormControl<string>, year: FormControl<number>}
