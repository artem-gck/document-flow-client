import { Doc } from "./doc.model";
import { Performer } from "./performer.model";
import { TaskModel } from "./task.model";

export class DialogSignatureData {
    public task: TaskModel;
    public performer: Performer;
    public documents: Doc[];
}