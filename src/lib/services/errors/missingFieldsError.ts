export class MissingFieldsError extends Error {
    constructor() {
        super('Some fields are blank or missing')
    }
}
