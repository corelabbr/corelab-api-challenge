export interface UseCase<IN, OUT> {

  execute(data: IN): Promise<OUT>;
}
