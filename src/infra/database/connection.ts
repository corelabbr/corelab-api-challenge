export interface Connection {
  query: (query: string, values: any[]) => Promise<any>
}