import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Performer } from 'src/app/shared/models/performer.model';
import { TaskModel } from 'src/app/shared/models/task.model';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit, OnChanges {
  @Input() task: TaskModel = new TaskModel();

  members: Performer[] = [];

  constructor(private userService: UserService) { }
  
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    let owner = await this.userService.getUser(this.task.ownerUserId).toPromise();
    this.task.ownerName = owner!.surname + ' ' + owner!.name;
    this.members = [];
    let membersArray = this.task.performers;

    membersArray.forEach(async memb => {
      let user = await this.userService.getUser(memb.userId).toPromise();
      memb.userName = user?.surname + " " + user?.name;
      
      this.members.push(memb!);
    });
  }

  async ngOnInit(): Promise<void> {

  }

}
