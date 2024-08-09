export default function stringToBoolean(str: string | boolean): boolean {
  return str === "true"? true : str === "false" ? false : undefined;
}