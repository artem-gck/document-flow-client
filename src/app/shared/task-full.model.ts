import { User } from "./user.model";

export interface TaskFull {
    header: string;
    status: string;
    creater: User;
    members: User[];
}