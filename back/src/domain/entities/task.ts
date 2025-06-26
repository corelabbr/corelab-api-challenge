import { Usuario, Prioridade } from "@prisma/client";

export class Task {
    constructor(
        public titulo: string,
        public descricao: string | null,
        public dataPrevista: Date,
        public prioridade: Prioridade,
        public status: boolean,
        public usuario?: Usuario,  
        public id?: number,
        public createdAt?: Date,
        public cor?: string | null,
    ) {}
}
