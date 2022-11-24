import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Doc } from 'src/app/shared/models/doc.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  name: string;
  typeOfExecution: number = 0;
  selectionOfTypes = [
    { value: 0, label: "Successively" }, 
    { value: 1, label: "Parallel" }
  ];

  stateCtrl = new FormControl('');
  filteredStates: Observable<Doc[]>;
  documents: Doc[] = [
    new Doc('1', 'Artem Hatsko', 1, 'It is my 1 document'), 
    new Doc('2', 'Artem Hatsko', 1, 'It is my 2 document'),
    // new Doc('Artem Hatsko', 1, 'It is my 3 document'),
    // new Doc('Artem Hatsko', 1, 'It is my 4 document'),
    // new Doc('Artem Hatsko', 1, 'It is my 5 document'),
    // new Doc('Artem Hatsko', 1, 'It is my 6 document'),
  ];

  myControl = new FormControl<string | User>('');
  options: User[] = [
    {name: 'Mary', position: "1", department: "1", task: ""}, 
    {name: 'Shelley', position: "2", department: "2", task: ""}, 
    {name: 'Igor', position: "3", department: "3", task: ""}
  ];
  filteredOptions: Observable<User[]>;

  constructor() { 
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(doc => (doc ? this._filterStates(doc) : this.documents.slice())),
    );
  }

  private _filterStates(value: string): Doc[] {
    const filterValue = value.toLowerCase();

    return this.documents.filter(document => document.description.toLowerCase().includes(filterValue));
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

}
