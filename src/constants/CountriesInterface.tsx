export interface CountriesInterface {
  name: string;
  code: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
  languages: { code: string; name: string }[];
  continent: { name: string };
}
