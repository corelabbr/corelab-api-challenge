export default interface Note {
    id?: number
    title: string
    desc: string
    color: string
    favorite: boolean
    createAT?: Date
    updateAT?: Date
}