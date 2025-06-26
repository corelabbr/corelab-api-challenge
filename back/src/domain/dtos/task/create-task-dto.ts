import { Prioridade } from '@prisma/client';
  
export type CreateTaskDTO = {
    titulo: string;
    descricao?: string | null;
    status: boolean;
    usuarioId: number;
    dataPrevista: Date;
    prioridade: Prioridade;
    cor?: string | null;
};
  