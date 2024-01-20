
export default interface NoteCase<E,O> {
    get(input: E): Promise<O>
    getOne(input: E): Promise<O>
    post(input: E): Promise<O>
    getByColor(input: E): Promise<O>
    put(input: E, data: E): Promise<O>
    delete(input: E, data: E): Promise<O>
}