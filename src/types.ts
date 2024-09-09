export enum IProgrammingParadigm {
  objectOriented = 'object-oriented',
  functional = 'functional',
  procedural = 'procedural',
  declarative = 'declarative'
}

export type IProgrammingLanguage = {
  id: string,
  name: string,
  creator: string,
  releaseYear: number,
  paradigm: IProgrammingParadigm,
  popularity: number,
}