import { Performer } from "./performer.model";
import { TaskDocument } from "./task-document.model";

export class TaskModel {
    public id: string;
    public type: string;
    public typeNumber: number;
    public header: string;
    public ownerUserId: string;
    public ownerName: string;
    public status: string;
    public deadLine: Date;
    public deadLineString: string;
    public createdAt: Date;
    public createdAtString: string;
    public performers: Performer[];
    public documents: TaskDocument[];
}