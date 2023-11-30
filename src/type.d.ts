export interface ITurma {
  id: number,
  turma: string,
}

export interface INotas {
  matematica: number [],
  portugues: number [],
  historia: number [],
  geografia: number [],
  fisica: number [],
  quimica: number [],
  linguas: number [],
}

export interface IFaltas {
  matematica: number,
  portugues: number,
  historia: number,
  geografia: number,
  fisica: number,
  quimica: number,
  linguas: number,
}

export interface IAlunos {
    id: number,
    nome: string,
    turma: number,
    notas: INotas, 
    faltas: IFaltas,
}

export interface IFiltro {
  id:string,
  nome:string,
}