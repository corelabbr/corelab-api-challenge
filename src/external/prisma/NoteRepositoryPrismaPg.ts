import { PrismaClient } from "@prisma/client";
import Note from "../../core/notes/model/Note";
import NoteRepository from "../../core/notes/service/NoteRepository"

export default class NoteRepositoryPrismaPg implements NoteRepository{
    private prisma: PrismaClient

    constructor(){
        this.prisma = new PrismaClient()
    }

    async get(): Promise<Note[]> {
        return this.prisma.note.findMany();
    }

    async getOne(title: string): Promise<Note | null> {
        return this.prisma.note.findUnique({
            where: {
                title
            }
        })
    }

    async getById(id: number): Promise<Note | null> {
        return this.prisma.note.findUnique({
            where: {
                id
            }
        })
    }

    async getByColor(color: string): Promise<Note[]> {
        return this.prisma.note.findMany({
            where: {
                color
            }
        })
    }

    async post(note: Note): Promise<Note> {
        return this.prisma.note.create({data: note});
    }

    async put(id:number, data: Note): Promise<Note> {

        return this.prisma.note.update({
            where: {
              id
            },
            data
          })
    }

    async delete(id: number): Promise<Note>{

        return this.prisma.note.delete({
            where: {
                id
            }
        })
    }
} 