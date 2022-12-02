export class Doc {
    constructor(
        public id: string, 
        public uploadDate: string, 
        public creatorId: string, 
        public version: number, 
        public name: string, 
        public creator: string ) {}
}