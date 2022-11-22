import { Component, OnInit } from '@angular/core';
import { TaskFull } from 'src/app/shared/task-full.model';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  task: TaskFull = { header: 'header', 
                 status: 'status', 
                 creater: {
                   name: 'Artem Hatsko', 
                   position: 'position', 
                   department: 'department',
                   task: 'Add new field'
                 }, 
                 members: [{ 
                   name: 'Artem Hatsko', 
                   position: 'position', 
                   department: 'department',
                   task: 'Add new field'}
                 ]
               };

  members: User[] = this.task.members;

  constructor() { }

  ngOnInit(): void {
  }

}
