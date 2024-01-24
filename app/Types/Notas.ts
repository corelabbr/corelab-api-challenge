import { dbQuery, dbQueryFirst } from '../../commands/Services/db'

export interface C_Notas {
  N_ID: number
  N_Titulo: string
  N_Notas: string
  N_Fav: number
  N_Cor_ID: number
}
export interface C_Cor {
  C_ID: number
  C_Nome: string
  C_Cor: string
}

export const NotasModel = {
  async insertNotas(notas: C_Notas) {
    notas.N_Cor_ID = 1
    await dbQuery('INSERT INTO C_Notas (N_Titulo, N_Notas, N_Fav, N_Cor_ID) VALUES (?, ?, ?, ?)', [
      notas.N_Titulo,
      notas.N_Notas,
      notas.N_Fav,
      notas.N_Cor_ID,
    ])

    const retorno = await dbQueryFirst(`SELECT * FROM C_Notas WHERE N_ID = last_insert_rowid()`)
    return retorno as C_Notas | undefined
  },

  async getIdNotas(id: number) {
    const retorno = await dbQueryFirst(`SELECT * FROM C_Notas WHERE N_ID = ?`, [id])
    return retorno as C_Notas | undefined
  },

  async getAllNotas() {
    const notas = await dbQuery('SELECT * FROM C_Notas')
    return notas as C_Notas[]
  },
  async deleteNota(id: number) {
    const result = await dbQuery('DELETE FROM C_Notas WHERE N_ID = ?', [id])
    return result
  },

  async updateNota(id: number, notaData: C_Notas) {
    const existingNota = await dbQuery('SELECT N_ID FROM C_Notas WHERE N_ID = ? AND N_ID <> ?', [
      id,
      id,
    ])
    if (existingNota.length > 0) {
      return null
    }

    const result = await dbQuery(
      'UPDATE C_Notas SET N_Titulo = ?, N_Notas = ?, N_Fav = ?, N_Cor_ID = ? WHERE N_ID = ?',
      [notaData.N_Titulo, notaData.N_Notas, notaData.N_Fav, notaData.N_Cor_ID, id]
    )

    return result
  },

  async getAllNotasFav() {
    const notas = await dbQuery('SELECT * FROM C_Notas WHERE N_Fav = 1')
    return notas as C_Notas[]
  },

  async getAllNotasNoFav() {
    const notas = await dbQuery('SELECT * FROM C_Notas WHERE N_Fav = 0')
    return notas as C_Notas[]
  },

  async getIdcor(id: number) {
    const retorno = await dbQueryFirst(`SELECT * FROM C_Cor WHERE C_ID = ?`, [id])
    return retorno as C_Cor | undefined
  },
}
