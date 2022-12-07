import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { TaskModel } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges  {
  @Input() selectedTab: number = 0;
  @Input() selectedTypeOfTasks: number = 0;

  displayedColumns: string[] = ['header', 'deadLine', 'ownerUserId', 'id', 'createdAt'];
  dataSource: MatTableDataSource<TaskModel>;
  tasks: TaskModel[] | undefined;

  pageSize: number[] = [ 6 ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() selectedTask = new EventEmitter<TaskModel>();

  constructor(
    private taskService: TaskService, 
    private userService: UserService) { }
  
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (this.selectedTypeOfTasks == 1)
      switch(this.selectedTab) {
        case 0:
          this.tasks = await this.taskService.getTasksByOwner("For work").toPromise();
          break;
        case 1:
          this.tasks = await this.taskService.getTasksByOwner("In work").toPromise();
          break;
        case 2:
          this.tasks = await this.taskService.getTasksByOwner("Completed").toPromise();
          break; 
        case 3:
          this.tasks = await this.taskService.getTasksByOwner("To refine").toPromise();
          break; 
      }  
    else
      switch(this.selectedTab) {
        case 0:
          this.tasks = await this.taskService.getTasksByPerformer("For work").toPromise();
          break;
        case 1:
          this.tasks = await this.taskService.getTasksByPerformer("In work").toPromise();
          break;
        case 2:
          this.tasks = await this.taskService.getTasksByPerformer("Completed").toPromise();
          break; 
        case 3:
          this.tasks = await this.taskService.getTasksByPerformer("To refine").toPromise();
          break; 
      }  

    if (this.tasks == undefined)
    {
      this.dataSource = new MatTableDataSource();
      return;
    }

    for (let i = 0; i < this.tasks.length; i++)
    {
      this.tasks.at(i)!.createdAtString = new Date(this.tasks.at(i)?.createdAt!).toLocaleDateString() as string;
      this.tasks.at(i)!.deadLineString = new Date(this.tasks.at(i)?.deadLine!).toLocaleDateString() as string;

      let user = await this.userService.getUser(this.tasks.at(i)!.ownerUserId).toPromise();
      this.tasks.at(i)!.ownerName = user!.surname + " " + user!.name;
    }

    this.dataSource = new MatTableDataSource(this.tasks);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async ngOnInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectRow(row: MatRow) {
    this.selectedTask.emit(row as TaskModel);
  }
}