export default abstract class Controller {
  abstract execute(payload: any): Promise<any>
}