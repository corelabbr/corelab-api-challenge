export class TaskDoesNotExistError extends Error {
    constructor() {
        super('This Task does not exist')
    }
}
