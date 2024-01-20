
export default interface NoteCase<E,O> {
    get(input: E): Promise<O>
    getOne(input: E): Promise<O>
    getById(input: E): Promise<O>
    post(input: E): Promise<O>
    put(input: E, data: E): Promise<O>
}