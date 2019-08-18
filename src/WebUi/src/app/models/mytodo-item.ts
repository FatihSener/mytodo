export class MyTodoItem {
    id: number;
    description: string = "";
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}