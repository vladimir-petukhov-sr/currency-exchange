export default interface RatesInterface {
  rates: {
    [key: string]: number;
  };
  base: string;
  date: string;
}
