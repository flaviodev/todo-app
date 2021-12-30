export class Todo {
    id!: number;
    task!: string;
    done: boolean = false;

    constructor(attributes: {id: number, task: string,  done?: boolean }) {
        this.id = attributes.id;
        this.task = attributes.task;
        if(attributes.done) this.done = attributes.done;
    }
}
