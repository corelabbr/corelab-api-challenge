import { Note } from 'App/Types/Note'

export const NoteStore: Note[] = [
  {
    id: '1',
    title: 'Compra do Mês',
    text: 'Arroz, feijao, misturas, produtos de limpeza',
    favorite: false,
    color: '#ffffff',
  },
  {
    id: '2',
    title: 'Séries',
    text: 'Breaking Bad, Game of Thrones, Friends, How i met your Mother',
    favorite: false,
    color: '#BAE2FF',
  },
  {
    id: '3',
    title: 'Estudos',
    text: 'ReactJS, AdonisJS, ReactNative, GIT',
    favorite: true,
    color: '#B9FFDD',
  },
]
