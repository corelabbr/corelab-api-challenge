export class TaskAlreadyHaveFileError extends Error {
    constructor() {
        super('This Task already has File')
    }
}
