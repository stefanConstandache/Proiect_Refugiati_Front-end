export class Request {
    constructor(
        public id: number | undefined,
        public requestType: string = "",
        public userNotes: string = "",
        public createdOn: Date = new Date(),
        public requestStatus: string = "",
        public refugeeEmail: string = "",
        public acceptedBy: string = "",
    ) { }
}