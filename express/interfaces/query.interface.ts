export default interface IQuery {
  text: string;
  values: (string | number | null)[];
}
