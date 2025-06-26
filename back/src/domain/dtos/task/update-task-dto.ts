import { Prioridade } from '@prisma/client';

export class UpdateTaskDTO {
    titulo?: string;
    descricao?: string;
    dataPrevista?: Date;
    prioridade?: Prioridade;
    status?: boolean;
    cor?: string;
}